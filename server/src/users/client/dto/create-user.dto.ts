import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Address } from "../entities/address.entity";
import { Organization } from "../entities/organization.entity";

export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    address: Address

    @IsNotEmpty()
    fullName:string;
    
    @IsPhoneNumber()
    phone: string

    @IsNotEmpty()
    organization: Organization
}
