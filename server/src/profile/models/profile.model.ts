import { Address } from "src/users/entities/address.entity"
import { AuthHistory } from "src/users/entities/auth-history.entity"
import { Organization } from "src/users/entities/organization.entity"
import { Requisities } from "src/users/entities/requisites.entity"
import { ROLE_TYPE } from "src/users/types/user-types"

export class Profile{
    fullName:string = ""
    email:string = ""
    address: Address | null = null
    phoneNumber: string = ""
    organization: Organization | null = null;
    requisities: Requisities | null = null
    role: ROLE_TYPE | null = null
    authHistories: AuthHistory[] | null = null
    passwordChangeDate: string | null = null

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