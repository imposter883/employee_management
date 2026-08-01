import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private readonly managerRepo: Repository<Manager>,
  ) { }

  async getAllManager(): Promise<Manager[]> {
    const manager = await this.managerRepo.find({
      relations: {
        user: true,
        department: true,
        employees: true,
        client: true
      }
    })
    return manager;
  }

  async getManagerById(id: number): Promise<Manager | null> {
    const manager = await this.managerRepo.findOne({
      where: { id },
      relations: {
        user: true,
        department: true,
        employees: true,
        client: true,
      }
    })
    return manager;
  }

  async getManagerByName(name: string): Promise<Manager> {
    const manager = await this.managerRepo.findOne({
      where: {
        user: {
          name: name,
        }
      },
      relations: {
        user: true,
        department: true,
        employees: true,
        client: true
      }
    })

    if (!manager) {
      throw new BadRequestException('Manager Not Found')
    }

    return manager
  }

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    const user = await this.managerRepo.findOne({
      where: {
        id: createManagerDto.userId
      }
    })

    if (!user) {
      throw new BadRequestException('User not Found')
    }

    const department = await this.managerRepo.findOne({
      where: {
        id: createManagerDto.departmentId
      }
    })

    if (!department) {
      throw new BadRequestException('Department not found')
    }

    const manager = await this.managerRepo.create({
      user,
      department,
      salary: createManagerDto.salary
    })

    return await this.managerRepo.save(manager)
  }

  async updateManager(id: number, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    const manager = await this.managerRepo.findOne({
      where: {
        id: id
      }
    })

    if (!manager) {
      throw new BadRequestException('Manager not Found')
    }

    Object.assign(manager, updateManagerDto);
    return await this.managerRepo.save(manager)
  }

  async deleteManager(id: number): Promise<string> {
    const manager = await this.managerRepo.delete(id)

    if (!manager || manager.affected === 0) {
      throw new BadRequestException('Manager not deleted')
    }
    
    const msg = 'Manager deleted Successfully.'
    return msg
  }
}
