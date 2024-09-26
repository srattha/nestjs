
import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '', description: 'userName' })
     userName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({ example: '', description: 'password' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ example: '', description: 'email' })
     email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '', description: 'firstName' })
     firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '', description: 'lastName' })
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: [1], 
        isArray: true,
    })
    roles: number[];

    @IsString()
    qrCode:string;

    @IsString()
    secret:string
    


}
