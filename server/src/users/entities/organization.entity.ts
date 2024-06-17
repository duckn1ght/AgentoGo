import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity } from "typeorm";
import { ORGANIZATION_TYPE } from "../types/user-types";


@Entity()
export class Organization extends AbstractEntity<Organization> {
    @Column({name:"img_url"})
    imgUrl: string

    @Column({name:"name"})
    name: string

    @Column({name:"type"})
    type:ORGANIZATION_TYPE

    @Column({name: "identity_number"})
    identityNumber:string
}
