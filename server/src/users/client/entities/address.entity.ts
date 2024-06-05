import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address extends AbstractEntity<Address> {

    @Column()
    reigon:string

    @Column()
    city:string

    @Column()
    street: string | null
}
