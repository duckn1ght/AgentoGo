import { Column, Entity, OneToOne} from "typeorm";
import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Client } from "./client.entity";

@Entity()
export class Requisities extends AbstractEntity<Requisities> {

    @Column({name: "bank_name"})
    bankName: string | null

    @Column({name: "identity_code"})
    identityCode: string | null

    @Column({name: "bank_code"})
    bankCode: string | null

    @Column({name: "ben_code"})
    benCode: string | null
}
