import { ApiProperty } from "@nestjs/swagger";
import { Address } from "src/users/client/entities/address.entity";
import { Organization } from "src/users/client/entities/organization.entity";
import { Requisities } from "src/users/client/entities/requisites.entity";

export class GetMyProfileResponse{
    @ApiProperty({example:"Петров Петр Петрович"})
    fullname:string = ''

    @ApiProperty({example:"email@mail.com"})
    email:string = ''
    
    @ApiProperty({example:"+77774443322"})
    phoneNumber:string = ''

    @ApiProperty({example:{
        id:"8883219321hfdsjh-123fhd",
        orgType: "ИП",
        identityNumber: "0203020102"
    }})
    organization: Organization = {
        id:"",
        orgType: "ТОО",
        identityNumber: ""
    }

    @ApiProperty({example: {
        id:"0293832vfdksd21321-321fds",
        region: "область",
        city: "город",
        street: "улица"
    }})
    address: Address = {
        id: "",
        region: "",
        city: "",
        street: ""
    }

    @ApiProperty({example: {
        id: "gdhsk321-321fxs-321dsa",
        bankName: "Kaspi bank",
        identityCode: "32152332",
        bankCode: "7432681",
        benCode: "22"
    }})
    requisities: Requisities = {
        id: "",
        bankName: "",
        identityCode: "",
        bankCode: "",
        benCode: ""
    }
}