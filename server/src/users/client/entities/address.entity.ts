import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Client } from "./client.entity";

@Entity()
export class Address extends AbstractEntity<Address> {

    @Column()
    region:string

    @Column()
    city:string

    @Column({nullable:true})
    street: string
}
