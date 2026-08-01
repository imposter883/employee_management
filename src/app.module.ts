import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { ClientModule } from './client/client.module';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal:true,
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],

      useFactory:(configService:ConfigService)=>({
        type:'postgres',
        host:configService.get<string>('DB_HOST'),
        port:configService.get<number>('DB_PORT'),
        username:configService.get<string>('DB_USERNAME'),
        password:configService.get<string>('DB_PASSWORD'),
        database:configService.get<string>('DB_NAME'),
        autoLoadEntities:true,
        synchronize:true
      })
    }),

    RolesModule,

    EmployeeModule,

    ManagerModule,

    ClientModule,

    DepartmentsModule,

    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
