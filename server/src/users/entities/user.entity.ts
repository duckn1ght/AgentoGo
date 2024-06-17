import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Address } from "./address.entity";
import { Organization } from "./organization.entity";
import { Requisities } from "./requisites.entity";
import { IsNotEmpty } from "class-validator";
import { POSITION, ROLE_TYPE } from "../types/user-types";
import { AuthHistory } from "./auth-history.entity";

@Entity()
export class User extends AbstractEntity<User> {

    @Column({unique: true})
    email:string

    @Column()
    password:string

    @Column()
    passwordChangeDate: string

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

    @Column()
    role: ROLE_TYPE
    
    @Column()
    poisiton: POSITION

    @OneToMany(() => AuthHistory, (authHistories) => authHistories.user, {cascade: true})
    @JoinTable()
    authHistories: AuthHistory[]
}
