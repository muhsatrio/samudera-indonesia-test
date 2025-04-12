import { BaseEntity } from "src/util/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Items extends BaseEntity {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    qty: number;
}