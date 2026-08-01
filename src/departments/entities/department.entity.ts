import { Manager } from "src/manager/entities/manager.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=>Manager,(manager)=>manager.department)
    manager: Manager[]

}
