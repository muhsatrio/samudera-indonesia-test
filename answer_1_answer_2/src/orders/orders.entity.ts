import { BaseEntity } from "src/util/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Orders extends BaseEntity {
    @Column({nullable: false})
    transaction_id: string;

    @Column({nullable: false})
    item_id: string;

    @Column({default: 0})
    qty: number;
}