import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [TypeOrmModule, CardsService],
})
export class CardsModule {}
