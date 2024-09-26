
import { Injectable, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users-management/entities/users-management.entity';
import * as bcrypt from 'bcryptjs';
import { UsersManagementService } from 'src/users-management/users-management.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

import { Totp, generateConfig } from "time2fa";

@Injectable()
export class AuthService {
  secret: string;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, private jwtService: JwtService
  ) {

  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(@Body() loginDto: LoginDto) {
    const { userName, password } = loginDto;
    // ดึงข้อมูลชื่อจากฐานข้อมูล
    let user = await this.userRepository.findOne({ where: { userName }, relations: ['roles'] });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const result = {
      data: {
        id: user.id,
        Username: user.userName,
      },
    };

    return result;
  }



  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { code, userId } = verifyOtpDto;

    const user = await this.userRepository.findOne({ where: { id: userId }, select: ['secret'] });
    if (!user) {
      throw new Error('User not found');
    }
    let access_token = '';
    let updatedUser;
    const valid = Totp.validate({ passcode: code, secret: user.secret });
    if (valid) {
      // สร้าง payload สำหรับ jwt token
      const payload = { email: user.email, role: user.roles[0].name, sub: user.id };
      // สร้าง access token
      access_token = await this.jwtService.signAsync(payload);

      // ตรวจสอบว่าผู้ใช้มีอยู่ก่อนทำการอัปเดต
       updatedUser = await this.userRepository.update(
        { id: user.id },
        { accessToken: access_token }
      );
    }
    // ตรวจสอบว่าอัปเดตสำเร็จหรือไม่
    if (!updatedUser) {
      throw new Error(`Failed to update accessToken for user with ID: ${user.id}`);
    }
    const result = {
      data: {
        token: access_token,
      },
    };

    return result;
  }
}