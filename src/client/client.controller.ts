import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UpdateEmployeeDto } from 'src/employee/dto/update-employee.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClient(){
    const client = await this.clientService.getAllClient()
    return client
  }

  @Get(':id')
  async getClientById(@Param('id')id:number){
    const client = await this.clientService.getClientById(id)
    return client
  }

  @Get('name')
  async getClientByName(@Query('name')name:string){
    const client = await this.clientService.getClientByName(name)
    return client
  }

  @Post()
  async createClient(@Body()createClientDto:CreateClientDto){
    const client = await this.clientService.createClient(createClientDto)
    return client
  }

  @Patch(':id')
  async updateClient(@Param('id')id:number,@Body()updateClientDto:UpdateClientDto):Promise<Client>{
    const client = await this.clientService.updateClient(id,updateClientDto)
    return client
  }

  @Delete(':id')
  async deleteClient(@Param('id')id:number):Promise<string>{
    const client = await this.clientService.deleteClient(id)
    return client
  }
}
