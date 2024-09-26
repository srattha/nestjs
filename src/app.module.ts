import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UsersManagementModule } from './users-management/users-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    // type: 'mysql',
    // host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT) || 3306,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // entities: [
    //   "dist/**/*.entity{.ts,.js}"
    // ],
    // synchronize: true,
    // timezone: 'Z',
    // }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',  // ชื่อ service ของ MySQL ใน docker-compose.yml
      port: 3306,        // พอร์ต 3306 ของ MySQL ภายใน container
      database: 'nestjs_docker',
      username: 'testuser',
      password: 'testuser123',
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    
    UsersManagementModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, 
    
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
