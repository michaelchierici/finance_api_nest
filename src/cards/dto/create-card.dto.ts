import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';
import { User } from 'src/entities';

export class CardDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nickname: string;

  @IsString()
  @IsNotEmpty()
  flag: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  user: User;
}
