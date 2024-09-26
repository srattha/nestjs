import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'test', description: 'User' })

    readonly userName: string;
    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'password', description: 'password' })

    readonly password: string;

    @IsString()
    readonly FcmToken: string;
}