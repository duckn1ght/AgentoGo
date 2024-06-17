import { ApiProperty } from "@nestjs/swagger";
import { Address } from "src/users/entities/address.entity";
import { AuthHistory } from "src/users/entities/auth-history.entity";
import { Organization } from "src/users/entities/organization.entity";
import { Requisities } from "src/users/entities/requisites.entity";
import { ORGANIZATION_TYPE } from "src/users/types/user-types";

export class GetMyProfileResponse{
    @ApiProperty({example:"Петров Петр Петрович"})
    fullname:string = ''

    @ApiProperty({example:"email@mail.com"})
    email:string = ''
    
    @ApiProperty({example:"+77774443322"})
    phoneNumber:string = ''

    @ApiProperty({example:{
        id:"8883219321hfdsjh-123fhd",
        type: "ИП",
        identityNumber: "0203020102",
        name: "Название организации",
        imgUrl: "Название картинки"
    }})
    organization: Organization = {
        id:"",
        type: ORGANIZATION_TYPE.TOO,
        identityNumber: "",
        name: "",
        imgUrl: ""
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
    @ApiProperty({example: [
    {
        id: "gdhsk321-321fxs-321dsa",
        authDate: "20240611T000000+0600",
        authPoint: "ул.Камзина",
        authManager: "Петров Петр Иванович",
    },
    {
        id: "gdhsk321-321fxs-321dsa",
        authDate: "20240523T000000+0600",
        authPoint: "ул.Камзина",
        authManager: "Петров Петр Иванович",
    }
]
})
    authHistories: AuthHistory[] = []
}