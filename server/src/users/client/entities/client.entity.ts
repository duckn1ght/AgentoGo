import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Address } from "./address.entity";
import { Organization } from "./organization.entity";
import { Requisities } from "./requisites.entity";
import { IsNotEmpty } from "class-validator";
import { ROLE_TYPE } from "../types/role";

@Entity()
export class Client extends AbstractEntity<Client> {

    @Column({unique: true})
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

    @OneToOne(() => Requisities, {cascade:true, nullable:true})
    @JoinColumn()
    requisities: Requisities

    @IsNotEmpty()
    role: ROLE_TYPE
}
