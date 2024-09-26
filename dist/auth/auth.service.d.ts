import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users-management/entities/users-management.entity';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    secret: string;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        data: {
            id: number;
            Username: string;
        };
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        data: {
            token: string;
        };
    }>;
}
