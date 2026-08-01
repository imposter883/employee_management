import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployee():Promise<Employee[]>{
    const emp = await this.employeeService.getAllEmployee();
    return emp
  }

  @Get(':id')
  async getEmployeeByID(@Param('id')id:number):Promise<Employee | null>{
    const emp = await this.employeeService.getEmployeeById(id)
    return emp
  }

  @Get('name')
  async getEmployeeByName(@Query('name')name:string):Promise<Employee>{
    const emp = await this.employeeService.getEmployeeByName(name)
    return emp
  }

  @Post()
  async createEmployee(@Body()createEmployeeDto:CreateEmployeeDto):Promise<Employee>{
    const emp = await this.employeeService.createEmployee(createEmployeeDto)
    return emp
  }

  @Patch(':id')
  async updateEmployee(@Param('id')id:number,@Body()updateEmployeeDto:UpdateEmployeeDto):Promise<Employee>{
    const emp = await this.employeeService.updateEmployee(id,updateEmployeeDto)
    return emp
  }

  @Delete(':id')
  async deleteEmployee(@Param('id')id:number):Promise<string>{
    const emp = await this.employeeService.deleteEmployee(id)
    return emp
  }
}
