import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,  // เพิ่ม repository ของ Permission
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    const { name, permissions } = createRoleDto;

    // ค้นหา Permissions จากฐานข้อมูล
    const permissionEntities = await this.permissionRepository.findByIds(permissions);
    if (permissionEntities.length !== permissions.length) {
      throw new BadRequestException('Some permissions do not exist');
    }

    // สร้าง Role entity
    const newRole = this.roleRepository.create({
      name,
      permissions: permissionEntities,
    });

    return this.roleRepository.save(newRole);  // บันทึก Role ลงฐานข้อมูล
  
  }

  findAll() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id }, relations: ['permissions'] }); 
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissions, ...rest } = updateRoleDto;

    // ค้นหาบทบาทที่ต้องการอัพเดต
    const role = await this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });

    if (!role) {
      throw new Error('Role not found');
    }
    await this.roleRepository.update({ id }, rest);

    // ดึงข้อมูลสิทธิ์อนุญาตใหม่ตาม ID ที่ให้มา
    const permissionEntities = await this.permissionRepository.findByIds(permissions);

    role.permissions = permissionEntities;

    return await this.roleRepository.save(role);
  }


  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
    }

    await this.roleRepository.remove(role);

    return { message: `Role with ID ${role.name} has been removed` };
  }
}
