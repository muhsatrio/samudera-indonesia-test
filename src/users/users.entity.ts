import { BaseEntity } from "src/util/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @Column({
        unique: true, 
        nullable: false
    })
    username: string;

    @Column({nullable: false})
    password: string;

    @Column()
    name: string;
}