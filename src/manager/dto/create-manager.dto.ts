import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class CreateManagerDto {
    @IsNotEmpty()
    @Type(()=>Number)
    userId:number

    @IsNotEmpty()
    @Type(()=>Number)
    salary:number

    @IsNotEmpty()
    @Type(()=>Number)
    departmentId:number
}
