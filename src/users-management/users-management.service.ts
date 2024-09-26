import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users-management.dto';
import { UpdateUsersManagementDto } from './dto/update-users-management.dto';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users-management.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/role/entities/role.entity';

import { Totp } from "time2fa";
import * as qrcode from "qrcode";
import * as speakeasy from 'speakeasy';
@Injectable()
export class UsersManagementService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const { email, userName, roles } = createUserDto;
    let key = Totp.generateKey({ issuer: "BaseChecker", user: email });

    try {
      
      

     // ตรวจสอบว่า email หรือ userName ซ้ำหรือไม่
      const existingEmailUser = await this.userRepository.findOne({ where: { email } });
      const existingUsernameUser = await this.userRepository.findOne({ where: { userName } });

      if (existingEmailUser) {
        throw new BadRequestException('Email already exists');
      }

      if (existingUsernameUser) {
        throw new BadRequestException('Username already exists');
       }
 
      const secret = this.generateSecret(email);
      const qrCodeBase64 = await this.generateQrCode(createUserDto, secret);

      // แฮชรหัสผ่าน
      const hashedPassword = await this.hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;

      // สร้าง QR code
      createUserDto.qrCode = `${qrCodeBase64}`;
      //
      createUserDto.secret = secret.secret

      // แปลง roles จาก number[] เป็น Role[] ก่อน
      const rolesEntities = await this.roleRepository.findByIds(roles);
      if (rolesEntities.length !== roles.length) {
        throw new BadRequestException('Some roles do not exist');
      }

      const newUser = this.userRepository.create({
        ...createUserDto,
        roles: rolesEntities,
      });

      return this.userRepository.save(newUser);

    } catch (error) {
      console.error('Error generating QR code:', error);
      return error;
    }

  }

  findAll() {
    return this.userRepository.find({ select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'roles', 'qrCode'], relations: ['roles', 'roles.permissions'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }, select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'roles'], relations: ['roles', 'roles.permissions'] })
  }

  async update(id: number, updateUserDto: UpdateUsersManagementDto) {
    const { roles, ...rest } = updateUserDto;

    // ค้นหา Role จาก ID
    const roleEntities = await this.roleRepository.findByIds(roles);

    if (roleEntities.length == 0) {
      throw new BadRequestException('Roles not found');
    }

    // ค้นหา User 
    const user = await this.userRepository.findOne({ where: { id }, relations: ['roles'] });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // อัปเดตข้อมูลของ User
    this.userRepository.merge(user, {
      ...rest,
      roles: roleEntities, // ใช้ Role entities แทน IDs
    });

    // บันทึก User ที่อัปเดต
    await this.userRepository.save(user);


  }

  async remove(id: number) {

    await this.userRepository.delete(id);

    return { message: `User with ID ${id} has been removed successfully` };
  }

  //แฮชรหัสผ่าน
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  //เปรียบเทียบรหัสผ่าน
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateQrCode(user, key) {
    try {
     
      const url = await new Promise((resolve, reject) => {
        qrcode.toDataURL(key.url, (err, url) => {
          if (err) {
            reject(err); // Reject promise if there's an error
          } else {
            resolve(url); // Resolve promise with the URL
          }
        });
      });
      return url;

    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  }


  generateSecret(email:string) {
    const key = Totp.generateKey({ issuer: "N0C", user: "johndoe@n0c.com" });
    return key;
  }

}
