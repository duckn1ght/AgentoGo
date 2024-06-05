import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type ORGANIZATION_TYPE = "ТОО" | "ИП"

@Entity()
export class Organization extends AbstractEntity<Organization> {

    @Column()
    type:ORGANIZATION_TYPE

    @Column({name: "identity_number"})
    identityNumber:string

    
}
