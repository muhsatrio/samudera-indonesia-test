import { BaseEntity } from "src/util/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Promos extends BaseEntity {
    @Column()
    discount_percentage: number;

    @Column()
    point_percentage: number;
}