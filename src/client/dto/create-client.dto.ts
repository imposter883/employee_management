import { IsIn, IsNotEmpty, IsString } from "class-validator"

export class CreateClientDto {
    @IsInt()
    userId:number

    @IsNotEmpty()
    @IsString()
    companyName:string

    @IsNotEmpty()
    @IsString()
    address:string

    @IsInt()
    managerId:number

    @IsInt()
    employeeId:number
}
