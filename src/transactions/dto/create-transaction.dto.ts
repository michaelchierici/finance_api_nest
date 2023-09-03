import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsEmpty,
} from 'class-validator';
import { Card } from 'src/entities';

export class TransactionDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDate()
  @IsEmpty()
  created_at: Date;

  @IsNumber()
  @IsNotEmpty()
  card: Card;
}
