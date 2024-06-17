import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { Address } from "../entities/address.entity";
import { Organization } from "../entities/organization.entity";
import { ROLE_TYPE } from "../types/user-types";

export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    address: Address

    @IsNotEmpty()
    fullName:string;
    
    @IsMobilePhone()
    phoneNumber: string

    @IsNotEmpty()
    organization: Organization

    @IsNotEmpty()
    role: ROLE_TYPE

    @IsString()
    passwordChangeDate: string
}
