import { Type } from "class-transformer"
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string 

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email:string

    @IsString()
    @IsNotEmpty()
    phone:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsInt()
    @IsNotEmpty()
    @Type(()=>Number)
    roleId:number
}
