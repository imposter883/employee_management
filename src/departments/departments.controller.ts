import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entities/department.entity';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async getAllDepartment():Promise<Department[]>{
    const department = await this.departmentsService.getAllDepartment()
    return department
  }

  @Post()
  async createDepartment(createDepartmentDto:CreateDepartmentDto):Promise<Department>{
    const department = await this.departmentsService.createDepartment(createDepartmentDto)
    return department
  }
  
}
