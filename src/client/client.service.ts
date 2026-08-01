import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly cilentRepo:Repository<Client>,
    @InjectRepository(Manager) private readonly managerRepo:Repository<Manager>,
    @InjectRepository(Employee) private readonly employeeRepo:Repository<Employee>,
    @InjectRepository(User) private readonly userRepo:Repository<User>
  ){}

  async getAllClient():Promise<Client[]>{
    const client = await this.cilentRepo.find({
      relations:{
          user:true,
          manager:true,
          employee:true
      }
    })
    return client
  }

  async getClientById(id:number):Promise<Client | null>{
    const client = await this.cilentRepo.findOne({
      where:{
        id:id
      }
    })
    if(!client){
      throw new BadRequestException('Client not Found')
    }
    return client
  }

  async getClientByName(name:string):Promise<Client>{
    const client = await this.cilentRepo.findOne({
      where:{
        user:{
          name:name
        }
      }
    })

    if(!client){
      throw new BadRequestException('Client not Found')
    }
    return client
  }

  async createClient(createClientDto:CreateClientDto):Promise<Client>{
    const user = await this.userRepo.findOne({
      where:{
        id:createClientDto.userId
      }
    })

    if(!user){
      throw new BadRequestException('Client not Found')
    }

    const manager = await this.managerRepo.findOne({
      where:{
        id:createClientDto.managerId
      }
    })

    if(!manager){
      throw new BadRequestException('Manager not Found')
    }

    const employee = await this.employeeRepo.findOne({
      where:{
        id:createClientDto.employeeId
      }
    })

    if(!employee){
      throw new BadRequestException('Employee not Found')
    }

    const client = await this.cilentRepo.create({
      employee,
      user,
      manager,
      companyName:createClientDto.companyName,
      address:createClientDto.address
    })

    return await this.cilentRepo.save(client)
  }

  async  updateClient(id:number,updateClientDto:UpdateClientDto):Promise<Client>{
    const client = await this.cilentRepo.findOne({
      where:{
        id:id
      }
    })

    if(!client){
      throw new BadRequestException('Client Not Found')
    }

    Object.assign(client,UpdateClientDto)
    return await this.cilentRepo.save(client);
  }

  async deleteClient(id:number):Promise<string>{
    const client = await this.cilentRepo.delete(id)
    if(!client || client.affected===0){
      throw new BadRequestException('Client Not Found')
    }else{
      return 'Client Deleted Successfully'
    }
  }
}
