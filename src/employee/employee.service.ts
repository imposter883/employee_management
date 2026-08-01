import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { User } from 'src/users/entities/user.entity';
import { privateDecrypt } from 'crypto';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepo:Repository<Employee>,
    @InjectRepository(Manager) private readonly managerRepo:Repository<Manager>,
    @InjectRepository(User) private readonly userRepo:Repository<User>,
    @InjectRepository(Client) private readonly clientRepo:Repository<Client>
  ){}

  async getAllEmployee():Promise<Employee[]>{
    const emp = await this.employeeRepo.find({
      relations:{
        user:true,
        client:true,
      }
    })
    return emp;
  }

  async getEmployeeById(id:number):Promise<Employee | null>{
    const emp = await this.employeeRepo.findOne({
      where:{id},
      relations:{
        user:true,
        client:true
      }
    })
    return emp
  }

  async getEmployeeByName(name:string):Promise<Employee>{
    const emp = await this.employeeRepo.findOne({
      where:{
        user:{
          name
        }
      },
      relations:{
        user:true,
        client:true
      }
    })

    if(!emp){
      throw new BadRequestException('Employee Not Found')
    }

    return emp
  }

  async createEmployee(createEmployeeDto:CreateEmployeeDto):Promise<Employee>{
    const user = await this.userRepo.findOne({
      where:{
        id:createEmployeeDto.userId
      }
    })

    if(!user){
      throw new BadRequestException('User Not Found')
    }

    const manager = await this.managerRepo.findOne({
      where:{
        id:createEmployeeDto.managerId
      }
    })

    if(!manager){
      throw new BadRequestException('Manager Not Found')
    }

    const client = await this.clientRepo.findOne({
      where:{
        id:createEmployeeDto.clientId
      }
    })

    if(!client){
      throw new BadRequestException('Client Not Found')
    }

    const emp = await this.employeeRepo.create({
      designation:createEmployeeDto.designation,
      salary:createEmployeeDto.salary,
      user,
      manager,
      client
    })

    return await this.employeeRepo.save(emp)
  }

  async updateEmployee(id:number,updateEmployeeDto:UpdateEmployeeDto):Promise<Employee>{
    const emp = await this.employeeRepo.findOne({
      where:{
        id:id
      }
    })

    if(!emp){
      throw new BadRequestException('Employee not Found')
    }
    
    Object.assign(emp,updateEmployeeDto)
    return await this.employeeRepo.save(emp)
  }

  async deleteEmployee(id:number):Promise<string>{
    const emp = await this.employeeRepo.delete(id)

    if(!emp || emp.affected===0){
      throw new BadRequestException('Employee Not Deleted')
    }else{
      return 'Employee Deleted Successfully'
    }
  }
}
