import { Module } from '@nestjs/common';
import { PromosController } from './promos.controller';
import { PromosService } from './promos.service';
import { Promos } from './promos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promos])
  ],
  controllers: [PromosController],
  providers: [PromosService]
})
export class PromosModule {}
