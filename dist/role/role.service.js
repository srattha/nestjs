"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entities/permission.entity");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    constructor(roleRepository, permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
    async create(createRoleDto) {
        const { name, permissions } = createRoleDto;
        const permissionEntities = await this.permissionRepository.findByIds(permissions);
        if (permissionEntities.length !== permissions.length) {
            throw new common_1.BadRequestException('Some permissions do not exist');
        }
        const newRole = this.roleRepository.create({
            name,
            permissions: permissionEntities,
        });
        return this.roleRepository.save(newRole);
    }
    findAll() {
        return this.roleRepository.find({ relations: ['permissions'] });
    }
    findOne(id) {
        return this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
    }
    async update(id, updateRoleDto) {
        const { permissions, ...rest } = updateRoleDto;
        const role = await this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
        if (!role) {
            throw new Error('Role not found');
        }
        await this.roleRepository.update({ id }, rest);
        const permissionEntities = await this.permissionRepository.findByIds(permissions);
        role.permissions = permissionEntities;
        return await this.roleRepository.save(role);
    }
    async remove(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        }
        await this.roleRepository.remove(role);
        return { message: `Role with ID ${role.name} has been removed` };
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map