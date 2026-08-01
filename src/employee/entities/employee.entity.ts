import { Client } from "src/client/entities/client.entity";
import { Department } from "src/departments/entities/department.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    designation:string 

    @Column('decimal')
    salary:number

    @CreateDateColumn()
    joinAt:Date

    @ManyToOne(()=>Manager,(manager)=>manager.employees)
    @JoinColumn({name:'managerId'})
    manager:Manager

    @OneToOne(()=>User,(user)=>user.employee)
    @JoinColumn()
    user:User

    @OneToOne(()=>Client,(client)=>client.employee)
    client:Client

}
