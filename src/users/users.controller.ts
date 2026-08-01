import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers():Promise<User[]>{
    const users = await this.usersService.getAllUsers()
    return users
  }  

  @Get(':id')
  async getUserById(@Param('id')id:number):Promise<User>{
    const user = await this.usersService.getUserById(id)
    return user
  }

  @Get('name')
  async getUserByName(@Query('name')name:string){
    const user = await this.usersService.getUserByName(name)
    return user
  }

  @Post()
  async createUsers(@Body()createUserDto:CreateUserDto):Promise<User>{
    const user = await this.usersService.createUsers(createUserDto)
    return user
  }

  @Patch(':id')
  async updateUsers(@Param('id')id:number,@Body()updateUserDto:UpdateUserDto):Promise<User>{
    const user = await this.usersService.updateUsers(id,updateUserDto)
    return user
  }

  @Delete('id')
  async deleteUsers(@Param('id')id:number):Promise<string>{
    const user = await this.usersService.deleteUsers(id)
    return user
  }
}
