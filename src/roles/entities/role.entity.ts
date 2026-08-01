import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum RoleName{
    SUPER_ADMIN = 'super_admin',
    MANAGER = 'manager',
    EMPLOYEE = 'employee',
    CLIENT = 'client'
}

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:'enum',
        enum:RoleName,
        unique:true
    })
    role:RoleName

    @OneToMany(()=>User,(user)=>user.role)
    users:User[]
    
}
