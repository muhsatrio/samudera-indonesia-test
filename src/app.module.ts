import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ItemsModule } from './items/items.module';
import { Items } from './items/items.entity';
import { PromosModule } from './promos/promos.module';
import { Promos } from './promos/promos.entity';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { BaseConst } from './util/base/base.const';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Orders } from './orders/orders.entity';
import { Transactions } from './transactions/transactions.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Items, Promos, Users, Orders, Transactions],
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      secret: BaseConst.JWT_SECRET,
      signOptions: {
          expiresIn: BaseConst.JWT_EXPIRY_TIME
      }
    }),
    ItemsModule,
    PromosModule,
    UsersModule,
    OrdersModule,
    TransactionsModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
