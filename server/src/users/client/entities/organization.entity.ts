import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";

export type ORGANIZATION_TYPE = "ТОО" | "ИП"

@Entity()
export class Organization extends AbstractEntity<Organization> {

    @Column({name:"org_type"})
    orgType:ORGANIZATION_TYPE

    @Column({name: "identity_number"})
    identityNumber:string
}
