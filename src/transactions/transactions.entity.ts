import { BaseEntity } from "src/util/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Transactions extends BaseEntity {
    @Column({nullable: false})
    promo_id: string;

    @Column({nullable: false})
    username: string;

    @Column()
    total_price: number;

    @Column()
    total_price_calculated: number;

    @Column()
    voucher: number;

    @Column()
    point: number;
}