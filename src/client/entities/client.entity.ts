import { Employee } from "src/employee/entities/employee.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    companyName:string

    @Column()
    address:string

    @OneToOne(()=>User,(user)=>user.client)
    @JoinColumn()
    user:User

    @OneToOne(()=>Manager,(manager)=>manager.client)
    @JoinColumn({name:'managerId'})
    manager:Manager

    @OneToOne(()=>Employee,(employee)=>employee.client)
    @JoinColumn()
    employee:Employee
}
