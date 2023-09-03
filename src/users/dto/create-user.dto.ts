import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

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
}
