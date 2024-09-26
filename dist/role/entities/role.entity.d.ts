import { Permission } from './permission.entity';
import { User } from 'src/users-management/entities/users-management.entity';
export declare class Role {
    id: number;
    name: string;
    permissions: Permission[];
    users: User[];
}
