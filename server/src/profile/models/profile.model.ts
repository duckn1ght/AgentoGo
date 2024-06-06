import { Address } from "src/users/client/entities/address.entity"
import { Organization } from "src/users/client/entities/organization.entity"
import { Requisities } from "src/users/client/entities/requisites.entity"
import { ROLE_TYPE } from "src/users/client/types/role"

export class Profile{
    fullName:string = ""
    email:string = ""
    address: Address | null = null
    phoneNumber: string = ""
    organization: Organization | null = null;
    requisities: Requisities | null = null
    role: ROLE_TYPE = "руководитель"

    constructor(item:any){
        const keys = Object.keys(this)
        let validItems:Profile = this

        for(const key in item){
            if(keys.includes(key)){
                validItems[`${key}`] = item[`${key}`]
            }
        }

        Object.assign(this, validItems)
    }
}