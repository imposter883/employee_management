import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department) private readonly departmentRepo:Repository<Department>,
  ){}
  
  async getAllDepartment():Promise<Department[]>{
    const department = await this.departmentRepo.find()
    return department
  }

  async createDepartment(createDepartmentDto:CreateDepartmentDto):Promise<Department>{
    const department = this.departmentRepo.create(
      createDepartmentDto
    )
    return await this.departmentRepo.save(department);
  }
}
