import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { CreateUserDto } from './dto/create-users-management.dto';
import { UpdateUsersManagementDto } from './dto/update-users-management.dto';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/role.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users-management')

@Controller('users-management')

export class UsersManagementController {
  constructor(private readonly usersManagementService: UsersManagementService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersManagementService.create(createUserDto);
  }
  @Get()
  // @HasRoles(Role.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.usersManagementService.findAll();
  }

  @Get(':id')
  // @HasRoles(Role.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersManagementService.findOne(+id);
  }

  @Patch(':id')
  // @HasRoles(Role.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id') id: string, @Body() updateUsersManagementDto: UpdateUsersManagementDto) {
    return this.usersManagementService.update(+id, updateUsersManagementDto);
  }

  @Delete(':id')
  // @HasRoles(Role.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersManagementService.remove(+id);
  }
}
