import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Transactions } from './transactions.entity';
import { Orders } from 'src/orders/orders.entity';
import { IsNull, Repository } from 'typeorm';
import { Items } from 'src/items/items.entity';
import { Promos } from 'src/promos/promos.entity';
import { TransactionVO } from './vo/transaction.vo';
import { CheckoutRequest } from './request/checkout.request';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(Items)
        private itemsRepository: Repository<Items>,
        @InjectRepository(Promos)
        private promosRepository: Repository<Promos>,
        @InjectRepository(Transactions)
        private transactionsRepository: Repository<Transactions>
    ) {}

    async checkout(request: CheckoutRequest, username: string): Promise<TransactionVO> {
        const transaction: TransactionVO = await this.validateRequestAndInsertTransaction(request, username);

        for (let i=0; i < request.orders.length; i++) {
            await this.ordersRepository.save({
                transaction_id: transaction.id,
                item_id: request.orders[i].item_id,
                qty: request.orders[i].qty
            });
        }

        return transaction;
    }

    private async validateRequestAndInsertTransaction(request: CheckoutRequest, username: string): Promise<TransactionVO> {
        let mapItemId = new Map<string, number>();
        let totalPrice: number = 0;

        request.orders.forEach(data => {
            if (!mapItemId.has(data.item_id)) {
                mapItemId.set(data.item_id, 1);
            }
            else {
                mapItemId.set(data.item_id, mapItemId.get(data.item_id) + 1);
            }
        });

        mapItemId.forEach((number, item_id) => {
            if (number > 1) {
                throw new BadRequestException(`Duplicate item_id on ${item_id}`)
            }
        });

        const promo: Promos = await this.promosRepository.findOne({
            where: {
                id: request.promo_id,
                deleted_at: IsNull()
            }
        });

        if (!promo) {
            throw new NotFoundException(`Not found promo for promo_id ${request.promo_id}`);
        }

        for (let i = 0; i < request.orders.length; i++) {
            const item: Items = await this.itemsRepository.findOne({
                where: {
                    id: request.orders[i].item_id,
                    deleted_at: IsNull()
                }
            });

            totalPrice+=item.price * request.orders[i].qty;

            if (!item) {
                throw new NotFoundException(`Not found item for item_id ${request.orders[i].item_id}`);
            }

            const orders: Orders[] = await this.ordersRepository.findBy({
                item_id: request.orders[i].item_id,
                deleted_at: IsNull()
            });

            let totalQty: number = 0;

            orders.forEach(order => {
                totalQty+=order.qty;
            });

            if (totalQty + request.orders[i].qty > item.qty) {
                throw new BadRequestException(`Insufficient qty for item_id ${request.orders[i].item_id}`);
            }
        }

        const voucher: number = (totalPrice * promo.discount_percentage) / 100;

        const point: number = (voucher * promo.point_percentage) / 100;

        const transaction: Transactions = await this.transactionsRepository.save({
            total_price: totalPrice,
            total_price_calculated: totalPrice - voucher,
            point: point,
            promo_id: promo.id,
            username: username,
            voucher: voucher
        })

        return {
            id: transaction.id,
            total_price: transaction.total_price,
            total_price_calculated: transaction.total_price_calculated,
            point: transaction.point,
            voucher: transaction.voucher
        };
    }
}
