import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { CardDTO } from './dto/create-card.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() card: CardDTO) {
    if (!card.nickname) {
      throw new BadRequestException('A user must have nickname');
    }
    return this.cardsService.create(card);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CardDTO> {
    const card =
      typeof id === 'number' && (await this.cardsService.findOne(id));
    if (!card) {
      throw new NotFoundException('Card not found!');
    }
    return card;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() card: Partial<CardDTO>,
  ): Promise<void> {
    const exists =
      typeof id === 'number' && (await this.cardsService.findOne(id));
    if (!exists) {
      throw new NotFoundException('Card not found!');
    }
    const formatCardToUpdate = {
      nickname: card.nickname,
    };

    await this.cardsService.update(id, formatCardToUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const card =
      typeof id === 'number' && (await this.cardsService.findOne(id));

    if (!card) {
      throw new NotFoundException();
    }
    return this.cardsService.remove(id);
  }
}
