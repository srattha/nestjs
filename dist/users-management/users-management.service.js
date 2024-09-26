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
exports.UsersManagementService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_management_entity_1 = require("./entities/users-management.entity");
const bcrypt = require("bcryptjs");
const role_entity_1 = require("../role/entities/role.entity");
const time2fa_1 = require("time2fa");
const qrcode = require("qrcode");
let UsersManagementService = class UsersManagementService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async create(createUserDto) {
        const { email, userName, roles } = createUserDto;
        let key = time2fa_1.Totp.generateKey({ issuer: "BaseChecker", user: email });
        try {
            const existingEmailUser = await this.userRepository.findOne({ where: { email } });
            const existingUsernameUser = await this.userRepository.findOne({ where: { userName } });
            if (existingEmailUser) {
                throw new common_2.BadRequestException('Email already exists');
            }
            if (existingUsernameUser) {
                throw new common_2.BadRequestException('Username already exists');
            }
            const secret = this.generateSecret(email);
            const qrCodeBase64 = await this.generateQrCode(createUserDto, secret);
            const hashedPassword = await this.hashPassword(createUserDto.password);
            createUserDto.password = hashedPassword;
            createUserDto.qrCode = `${qrCodeBase64}`;
            createUserDto.secret = secret.secret;
            const rolesEntities = await this.roleRepository.findByIds(roles);
            if (rolesEntities.length !== roles.length) {
                throw new common_2.BadRequestException('Some roles do not exist');
            }
            const newUser = this.userRepository.create({
                ...createUserDto,
                roles: rolesEntities,
            });
            return this.userRepository.save(newUser);
        }
        catch (error) {
            console.error('Error generating QR code:', error);
            return error;
        }
    }
    findAll() {
        return this.userRepository.find({ select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'roles', 'qrCode'], relations: ['roles', 'roles.permissions'] });
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id }, select: ['id', 'firstName', 'lastName', 'email', 'isActive', 'roles'], relations: ['roles', 'roles.permissions'] });
    }
    async update(id, updateUserDto) {
        const { roles, ...rest } = updateUserDto;
        const roleEntities = await this.roleRepository.findByIds(roles);
        if (roleEntities.length == 0) {
            throw new common_2.BadRequestException('Roles not found');
        }
        const user = await this.userRepository.findOne({ where: { id }, relations: ['roles'] });
        if (!user) {
            throw new common_2.BadRequestException('User not found');
        }
        this.userRepository.merge(user, {
            ...rest,
            roles: roleEntities,
        });
        await this.userRepository.save(user);
    }
    async remove(id) {
        await this.userRepository.delete(id);
        return { message: `User with ID ${id} has been removed successfully` };
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    async generateQrCode(user, key) {
        try {
            const url = await new Promise((resolve, reject) => {
                qrcode.toDataURL(key.url, (err, url) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(url);
                    }
                });
            });
            return url;
        }
        catch (error) {
            console.error('Error generating QR code:', error);
            throw error;
        }
    }
    generateSecret(email) {
        const key = time2fa_1.Totp.generateKey({ issuer: "N0C", user: "johndoe@n0c.com" });
        return key;
    }
};
exports.UsersManagementService = UsersManagementService;
exports.UsersManagementService = UsersManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_management_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersManagementService);
//# sourceMappingURL=users-management.service.js.map