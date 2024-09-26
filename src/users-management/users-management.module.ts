import { Module } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { UsersManagementController } from './users-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users-management/entities/users-management.entity';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from 'src/role/entities/permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  controllers: [UsersManagementController],
  providers: [UsersManagementService],
})
export class UsersManagementModule {}
