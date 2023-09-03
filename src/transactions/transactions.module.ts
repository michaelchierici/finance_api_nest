import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transaction } from 'src/entities';
import { TransactionsServices } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CardsModule],
  providers: [TransactionsServices],
  controllers: [TransactionsController],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}
