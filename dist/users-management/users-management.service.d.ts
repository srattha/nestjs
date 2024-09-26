import { CreateUserDto } from './dto/create-users-management.dto';
import { UpdateUsersManagementDto } from './dto/update-users-management.dto';
import { Repository } from 'typeorm';
import { User } from './entities/users-management.entity';
import { Role } from 'src/role/entities/role.entity';
export declare class UsersManagementService {
    private userRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUsersManagementDto): Promise<void>;
    remove(id: number): Promise<{
        message: string;
    }>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    generateQrCode(user: any, key: any): Promise<unknown>;
    generateSecret(email: string): {
        readonly issuer: string;
        readonly user: string;
        readonly secret: string;
        readonly url: string;
        readonly config: import("time2fa").ValidTotpConfig;
    };
}
