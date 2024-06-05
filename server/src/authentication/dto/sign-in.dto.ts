import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator"

export class SignInDto {
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}
