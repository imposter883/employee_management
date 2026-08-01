import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  async getAllManager():Promise<Manager[]>{
    const manager = await this.managerService.getAllManager()
    return manager
  }

  @Get(':id')
  async getManagerById(@Param('id')id:number):Promise<Manager | null>{
    const manager = await this.managerService.getManagerById(id)
    return manager
  }

  @Get('name')
  async getManagerByName(@Query('name')name:string):Promise<Manager >{
    const manager = await this.managerService.getManagerByName(name)
    return manager
  }

  @Post()
  async createManager(@Body() createManagerDto:CreateManagerDto):Promise<Manager>{
    const manager = await this.managerService.createManager(createManagerDto)
    return manager
  }

  @Patch(':id')
  async updateManager(@Param('id')id:number,@Body()updateManagerDto:UpdateManagerDto):Promise<Manager>{
    const manager = await this.managerService.updateManager(id,updateManagerDto)
    return manager
  }

  @Delete(':id')
  async deleteManager(@Param('id')id:number):Promise<string>{
    const manager =await this.managerService.deleteManager(id)
    return manager
  }
}
