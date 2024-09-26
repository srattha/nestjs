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
exports.UsersManagementController = void 0;
const common_1 = require("@nestjs/common");
const users_management_service_1 = require("./users-management.service");
const create_users_management_dto_1 = require("./dto/create-users-management.dto");
const update_users_management_dto_1 = require("./dto/update-users-management.dto");
const swagger_1 = require("@nestjs/swagger");
let UsersManagementController = class UsersManagementController {
    constructor(usersManagementService) {
        this.usersManagementService = usersManagementService;
    }
    create(createUserDto) {
        return this.usersManagementService.create(createUserDto);
    }
    findAll() {
        return this.usersManagementService.findAll();
    }
    findOne(id) {
        return this.usersManagementService.findOne(+id);
    }
    update(id, updateUsersManagementDto) {
        return this.usersManagementService.update(+id, updateUsersManagementDto);
    }
    remove(id) {
        return this.usersManagementService.remove(+id);
    }
};
exports.UsersManagementController = UsersManagementController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_management_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersManagementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersManagementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersManagementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_users_management_dto_1.UpdateUsersManagementDto]),
    __metadata("design:returntype", void 0)
], UsersManagementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersManagementController.prototype, "remove", null);
exports.UsersManagementController = UsersManagementController = __decorate([
    (0, swagger_1.ApiTags)('users-management'),
    (0, common_1.Controller)('users-management'),
    __metadata("design:paramtypes", [users_management_service_1.UsersManagementService])
], UsersManagementController);
//# sourceMappingURL=users-management.controller.js.map