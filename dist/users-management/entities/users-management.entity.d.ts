import { Role } from 'src/role/entities/role.entity';
export declare class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    roles: Role[];
    accessToken: string;
    secret: string;
    qrCode: string;
}
