import { ApiProperty } from "@nestjs/swagger";

export class GetMyProfileResponse{
    @ApiProperty({example:"Имя"})
    firstName:string = ''

    @ApiProperty({example:"Фамилия"})
    lastName:string = ''

    @ApiProperty({example:"email@mail.com"})
    email:string = ''

    @ApiProperty({example:"username"})
    username:string = ''
}