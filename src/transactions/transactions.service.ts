import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from 'src/entities/transaction.entity';
import { TransactionDTO } from './dto/create-transaction.dto';

import { Card } from 'src/entities';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class TransactionsServices {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
    private readonly cardsService: CardsService,
  ) {}

  async create(createTransactionDTO: TransactionDTO): Promise<TransactionDTO> {
    const { card, value } = createTransactionDTO;
    const cardToCreate = await this.cardsService.findOne(card.id);
    if (!cardToCreate) {
      throw new BadRequestException('No card founded');
    }

    const addTransactionInCard = {
      ...card,
      limit: card.limit - value,
    };
    const transaction =
      this.transactionsRepository.create(createTransactionDTO);
    await this.transactionsRepository.save(transaction);
    await this.cardsRepository.save(addTransactionInCard);
    return transaction;
  }

  async findAll(): Promise<Transaction[]> {
    const transaction = await this.transactionsRepository.find();
    return transaction;
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
    });
    return transaction;
  }

  async update(id: number, updateTransactionDTO: TransactionDTO) {
    const transaction = await this.transactionsRepository.update(
      id,
      updateTransactionDTO,
    );
    return transaction;
  }

  async remove(id: number) {
    const transaction = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.card', 'card')
      .where('transaction.id = :id', { id })
      .getOne();
    const { card, value } = transaction;

    const cardExists = await this.cardsService.findOne(card.id);

    if (!cardExists) {
      throw new BadRequestException('No card founded');
    }

    const removeTransactionsFromCard = {
      ...card,
      limit: card.limit + value,
    };

    const transactionToDeleted = this.transactionsRepository.delete(id);
    await this.cardsRepository.save(removeTransactionsFromCard);
    return transactionToDeleted;
  }
}
