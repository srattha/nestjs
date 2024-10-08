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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("typeorm");
const users_management_module_1 = require("./users-management/users-management.module");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const role_module_1 = require("./role/role.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_2.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'mysql_db',
                port: 3306,
                database: 'nestjs_docker',
                username: 'testuser',
                password: 'testuser123',
                synchronize: true,
                entities: ["dist/**/*.entity{.ts,.js}"],
            }),
            users_management_module_1.UsersManagementModule, auth_module_1.AuthModule, role_module_1.RoleModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
        ],
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map