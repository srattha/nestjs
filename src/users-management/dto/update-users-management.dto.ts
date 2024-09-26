import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersManagementDto {

    @IsString()
    @IsEmail()
    @ApiProperty({ example: '', description: 'email' })
    email: string;


    @IsString()
    @ApiProperty({ example: '', description: 'firstName' })
    firstName: string;


    @IsString()
    @ApiProperty({ example: '', description: 'lastName' })
    lastName: string;


    @ApiProperty({
        description: 'List of role IDs',
        type: [Number],
    })
    roles: number[];
}
