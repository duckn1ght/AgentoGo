import { AddressDto, OrganizationDto } from "../../pages/auth/Register";

type RequisitiesData = {
    bankName: string,
    identityCode:string,
    bankCode:string,
    benCode:string
}

export interface Profile{
    fullName:string,
    email:string,
    address: AddressDto & {
        id:string
    }
    organization: OrganizationDto & { 
        id:string
    }
    phoneNumber:string,
    requisities?: RequisitiesData | null
}