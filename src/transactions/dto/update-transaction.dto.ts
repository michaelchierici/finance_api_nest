import { PartialType } from '@nestjs/mapped-types';
import { TransactionDTO } from './create-transaction.dto';

export class UpdateTransactionDTO extends PartialType(TransactionDTO) {}
