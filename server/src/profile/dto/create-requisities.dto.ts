import { IsNotEmpty } from "class-validator";

export class CreateRequisitiesDto{
    @IsNotEmpty()
    bankName:string
    
    @IsNotEmpty()
    identityCode:string
    
    @IsNotEmpty()
    bankCode:string
    
    @IsNotEmpty()
    benCode:string
}   