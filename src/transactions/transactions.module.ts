import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/orders/orders.entity';
import { Items } from 'src/items/items.entity';
import { Promos } from 'src/promos/promos.entity';
import { Transactions } from './transactions.entity';
import { AuthMiddleware } from 'src/util/middleware/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([Orders, Items, Promos, Transactions])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(TransactionsController)
    }
}
