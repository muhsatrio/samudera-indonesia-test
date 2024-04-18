import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from './items.entity';
import { Repository } from 'typeorm';
import { ItemVO } from './vo/item.vo';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Items)
        private itemsRepository: Repository<Items>
    ) {}

    async seed(): Promise<void> {
        for (let i = 0; i < 5; i++) {
            await this.itemsRepository.insert({
                name: `Item ${Math.floor(Math.random() * 100)}`,
                price: Math.floor(Math.random() * 100000),
                qty: 20
            });
        }
    }

    async get(): Promise<ItemVO[]> {
        const items: Items[] = await this.itemsRepository.find();

        const itemsVO: ItemVO[] = [];

        items.forEach(item => {
            itemsVO.push({
                id: item.id,
                price: item.price,
                qty: item.qty,
                name: item.name
            });
        });

        return itemsVO;
    }
}
