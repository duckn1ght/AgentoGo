import { AddressDto, OrganizationDto, POSITION, ROLE_TYPE } from "../../pages/auth/Register"

type RequisitiesData = {
    id:string,
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
    requisities?: RequisitiesData | null,
    passwordChangeDate: string,
    role: ROLE_TYPE,
    position: POSITION
}