import { Client } from "src/client/entities/client.entity";
import { Department } from "src/departments/entities/department.entity";
import { Employee } from "src/employee/entities/employee.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('managers')
export class Manager {
    @PrimaryGeneratedColumn()
    id:number

    @Column('decimal')
    salary:number

    @OneToOne(()=>User,(user)=>user.manager)
    @JoinColumn()
    user:User

    @ManyToOne(()=>Department,(department)=>department.manager)
    @JoinColumn({name:'departmentId'})
    department:Department

    @OneToMany(()=>Employee,(employees)=>employees.manager)
    employees:Employee[]

    @OneToOne(()=>Client,(client)=>client.manager)
    client:Client

}
