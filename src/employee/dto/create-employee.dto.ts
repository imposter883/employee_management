import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsInt()
    userId:number

    @IsNotEmpty()
    @IsString()
    designation:string

    @IsNotEmpty()
    @IsInt()
    @Type(()=>Number)
    salary:number

    @IsInt()
    @IsNotEmpty()
    managerId:number

    @IsOptional()
    @IsInt()
    clientId?:number
}
