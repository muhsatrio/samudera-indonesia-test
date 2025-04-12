import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Items } from './items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Items])
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
