import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RoleName } from './entities/role.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RolesService implements OnModuleInit{
  constructor(
    @InjectRepository(Role) private readonly roleRepo:Repository<Role>, 
  ){}

  async onModuleInit() {
    await this.seedRoles()
  }

  async seedRoles():Promise<void>{
    const roles = [
      RoleName.SUPER_ADMIN,
      RoleName.MANAGER,
      RoleName.EMPLOYEE,
      RoleName.CLIENT
    ]

    for(const roleName of roles){
      const exists = await this.roleRepo.findOne({
        where:{
          role:roleName,
        }
      })
      if(!exists){
        const role = this.roleRepo.create({
          role : roleName,
        })
        await this.roleRepo.save(role);
      }
    }
    console.log('Roles seeded successfully!')
  }
}
