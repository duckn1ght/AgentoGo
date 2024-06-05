import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Address } from "./address.entity";
import { Organization } from "./organization.entity";

@Entity()
export class Client extends AbstractEntity<Client> {

    @Column()
    email:string

    @Column()
    password:string

    @OneToOne(() => Address, {cascade: true})
    @JoinColumn()
    address: Address

    @Column({name: "full_name"})
    fullName:string

    @Column({name: "phone_number"})
    phoneNumber:string

    @OneToOne(() => Organization, {cascade: true})
    @JoinColumn()
    organization: Organization
}
