import { UsersManagementService } from './users-management.service';
import { CreateUserDto } from './dto/create-users-management.dto';
import { UpdateUsersManagementDto } from './dto/update-users-management.dto';
export declare class UsersManagementController {
    private readonly usersManagementService;
    constructor(usersManagementService: UsersManagementService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<import("./entities/users-management.entity").User[]>;
    findOne(id: string): Promise<import("./entities/users-management.entity").User>;
    update(id: string, updateUsersManagementDto: UpdateUsersManagementDto): Promise<void>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
