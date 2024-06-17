import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class AuthHistory extends AbstractEntity<AuthHistory> {

    @Column()
    authDate:string

    @Column()
    authPoint:string

    @Column({nullable:true})
    authManager: string

    @ManyToOne(() => User, (user) => user.authHistories)
    user: User
}
