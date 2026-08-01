import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    ) { }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepo.find()
        return users
    }

    async getUserById(id: number): Promise<User> {
        const users = await this.userRepo.findOne({
            where: { id: id }
        })
        
        if(!users){
            throw new BadRequestException('User not Found')
        }

        return users
    }

    async getUserByName(name: string): Promise<User | null> {
        const users = await this.userRepo.findOne({
            where: {
                name: name
            }
        })
        return users
    }

    async createUsers(createUserDto: CreateUserDto): Promise<User> {

        const role = await this.roleRepo.findOne({
            where: {
                id: createUserDto.roleId,
            },
        });

        if (!role) {
            throw new BadRequestException('Role not Found')
        }

        const user = await this.userRepo.create({
            name: createUserDto.name,
            email: createUserDto.email,
            phone: createUserDto.phone,
            password: createUserDto.password,
            role: role,

        })
        return await this.userRepo.save(user)
    }

    async updateUsers(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(id);

        if (updateUserDto.roleId) {
            const role = await this.roleRepo.findOne({
                where: {
                    id: updateUserDto.roleId,
                },
            });

            if (!role) {
                throw new BadRequestException('Role not found');
            }

            user.role = role;
        }

        delete updateUserDto.roleId;

        Object.assign(user, updateUserDto);

        return await this.userRepo.save(user);

    }

    async deleteUsers(id: number): Promise<string> {
        const user = await this.userRepo.delete(id)

        if (!user || user.affected === 0) {
            throw new BadRequestException('User not found')
        }

        return 'User deleted Successfully'
    }
}
