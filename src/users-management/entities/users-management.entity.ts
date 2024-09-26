
import { IsEmail, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    //@Length(4, 50)  // กำหนดความยาวของ userName ตั้งแต่ 4 ถึง 50 ตัวอักษร
    userName: string;

    @Column()
    password: string;  // เพิ่มการเข้ารหัสในกระบวนการ (ควรเข้ารหัสรหัสผ่านก่อนเก็บลงฐานข้อมูล)

    @Column({ length: 100 })
    //@Length(1, 100)  // กำหนดความยาวของ firstName
    firstName: string;

    @Column({ length: 100 })
    // @Length(1, 100)  // กำหนดความยาวของ lastName
    lastName: string;

    @Column({ length: 100 })
    @IsEmail()  // ตรวจสอบว่าเป็นรูปแบบอีเมลที่ถูกต้อง
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[];

    @Column({ default: '' })
    accessToken:string

    @Column({ default: '' })
    secret: string

    @Column('text')
    qrCode: string;
}
