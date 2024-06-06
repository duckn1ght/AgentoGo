import { IsAlpha, IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Address } from "../entities/address.entity";
import { Organization } from "../entities/organization.entity";

export class CreateClientDto {
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
}
