import { IsNotEmpty } from "class-validator";
import { OrderVO } from "../vo/order.vo";

export class CheckoutRequest {
    orders: OrderVO[]

    @IsNotEmpty()
    promo_id: string
}