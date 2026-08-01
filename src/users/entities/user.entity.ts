import { Client } from "src/client/entities/client.entity";
import { Employee } from "src/employee/entities/employee.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    phone:string

    @ManyToOne(()=>Role,(role)=>role.users)
    @JoinColumn({name:'roleId'})
    role:Role

    @OneToOne(()=>Manager,(manager)=>manager.user)
    manager:Manager

    @OneToOne(()=>Employee,(employees)=>employees.user)
    employee:Employee

    @OneToOne(()=>Client,(client)=>client.user)
    client:Client


}
