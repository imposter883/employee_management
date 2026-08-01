import { IsEnum } from "class-validator";
import { RoleName } from "../entities/role.entity";

export class CreateRoleDto{
    @IsEnum()
    role:RoleName
}