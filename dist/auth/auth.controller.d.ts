import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
