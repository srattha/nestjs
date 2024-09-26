import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VerifyOtpDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'pcode', description: '' })
     code: string;
    @ApiProperty({ example: 'userId', description: '' })
    @IsString()
     userId: number; 
}