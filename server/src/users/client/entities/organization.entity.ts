import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type ORGANIZATION_TYPE = "ТОО" | "ИП"

@Entity()
export class Organization extends AbstractEntity<Organization> {

    @Column({name:"org_type"})
    orgType:ORGANIZATION_TYPE

    @Column({name: "identity_number"})
    identityNumber:string
}
