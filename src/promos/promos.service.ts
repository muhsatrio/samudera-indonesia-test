import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promos } from './promos.entity';
import { Repository } from 'typeorm';
import { PromoVO } from './vo/promo.vo';

@Injectable()
export class PromosService {
    constructor(
        @InjectRepository(Promos)
        private promosRepository: Repository<Promos>
    ) {}

    async seed(): Promise<void> {
        for (let i = 0; i < 10; i++) {
            await this.promosRepository.insert({
                discount_percentage: Math.floor(Math.random() * 50),
                point_percentage: Math.floor(Math.random() * 10)
            });
        }
    }

    async get(): Promise<PromoVO[]> {
        const promos: Promos[] = await this.promosRepository.find();

        const promosVO: PromoVO[] = [];

        promos.forEach(promo => {
            promosVO.push({
                id: promo.id,
                discount_percentage: promo.discount_percentage,
                point_percentage: promo.point_percentage
            });
        })

        return promosVO;
    }
}
