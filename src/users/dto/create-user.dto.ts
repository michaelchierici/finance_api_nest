import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsEmpty,
} from 'class-validator';
import { Card } from 'src/entities';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsEmpty()
  card: Card[];
}
