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
import { TransactionDTO } from './dto/create-transaction.dto';
import { TransactionsServices } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsServices: TransactionsServices) {}

  @Post()
  create(@Body() transaction: TransactionDTO) {
    if (!transaction.value && !transaction.card_id) {
      throw new BadRequestException(
        'Transaction needs a value and a transaction id',
      );
    }
    return this.transactionsServices.create(transaction);
  }

  @Get()
  findAll() {
    return this.transactionsServices.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TransactionDTO> {
    const transaction =
      typeof id === 'number' && (await this.transactionsServices.findOne(id));
    if (!transaction) {
      throw new NotFoundException('transaction not found!');
    }
    return transaction;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() transaction: Partial<TransactionDTO>,
  ): Promise<void> {
    const exists =
      typeof id === 'number' && (await this.transactionsServices.findOne(id));
    if (!exists) {
      throw new NotFoundException('transaction not found!');
    }

    await this.transactionsServices.update(id, transaction as TransactionDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const transaction = await this.transactionsServices.findOne(id);
    if (!transaction) {
      throw new NotFoundException('transaction not founded');
    }
    return this.transactionsServices.remove(id);
  }
}
