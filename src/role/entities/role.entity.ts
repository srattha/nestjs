import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from 'src/users-management/entities/users-management.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    
    name: string;

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable()
    permissions: Permission[];

    @ManyToMany(() => User, user => user.roles)
    users: User[];
    
}
