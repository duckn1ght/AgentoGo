import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"

export class SignInDto {
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    @IsNotEmpty()
    date:string

    @IsNotEmpty()
    authPoint: string

    @IsOptional()
    authManager?: string
}
