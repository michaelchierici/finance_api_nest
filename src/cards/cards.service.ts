import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CardDTO } from './dto/create-card.dto';
import { UpdateCardDTO } from './dto/update-card.dto';

import { Repository } from 'typeorm';
import { Card } from 'src/entities';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async create(createCardDTO: CardDTO): Promise<CardDTO> {
    const card = this.cardsRepository.create(createCardDTO);
    await this.cardsRepository.save(card);
    return card;
  }

  async findAll(): Promise<Card[]> {
    const cards = await this.cardsRepository.find();
    return cards;
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOne({ where: { id } });
    return card;
  }

  async update(id: number, updateCardDTO: UpdateCardDTO) {
    const card = await this.cardsRepository.update(id, updateCardDTO);
    return card;
  }

  async remove(id: number) {
    const card = await this.cardsRepository.delete(id);
    return card;
  }
}
