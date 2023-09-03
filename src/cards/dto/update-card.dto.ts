import { PartialType } from '@nestjs/mapped-types';
import { CardDTO } from './create-card.dto';

export class UpdateCardDTO extends PartialType(CardDTO) {}
