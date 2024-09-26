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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_management_entity_1 = require("../users-management/entities/users-management.entity");
const bcrypt = require("bcryptjs");
const login_dto_1 = require("./dto/login.dto");
const time2fa_1 = require("time2fa");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const { userName, password } = loginDto;
        let user = await this.userRepository.findOne({ where: { userName }, relations: ['roles'] });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const result = {
            data: {
                id: user.id,
                Username: user.userName,
            },
        };
        return result;
    }
    async verifyOtp(verifyOtpDto) {
        const { code, userId } = verifyOtpDto;
        const user = await this.userRepository.findOne({ where: { id: userId }, select: ['secret'] });
        if (!user) {
            throw new Error('User not found');
        }
        let access_token = '';
        let updatedUser;
        const valid = time2fa_1.Totp.validate({ passcode: code, secret: user.secret });
        if (valid) {
            const payload = { email: user.email, role: user.roles[0].name, sub: user.id };
            access_token = await this.jwtService.signAsync(payload);
            updatedUser = await this.userRepository.update({ id: user.id }, { accessToken: access_token });
        }
        if (!updatedUser) {
            throw new Error(`Failed to update accessToken for user with ID: ${user.id}`);
        }
        const result = {
            data: {
                token: access_token,
            },
        };
        return result;
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_management_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map