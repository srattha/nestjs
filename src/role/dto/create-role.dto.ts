
import { IsString, Length, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
    @IsString()
    @Length(1, 50)
    @ApiProperty({ example: '', description: 'role name' })
    name: string;  // ชื่อของ Role

    @ApiProperty({
        example: [1], // ค่าเริ่มต้นสำหรับ permissions
        description: 'List of permission IDs',
        isArray: true, // ระบุว่าเป็น array
    })
    @IsArray() // ตรวจสอบว่า permissions เป็น array
    @IsNumber({}, { each: true }) // ตรวจสอบว่าแต่ละค่าภายใน array เป็น number
    permissions: number[];
}
