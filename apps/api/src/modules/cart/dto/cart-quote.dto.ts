import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuoteItemDto } from './quote-item.dto';

export class CartQuoteDto {
  @ApiProperty({
    description: 'Lista de items para cotizar',
    type: [QuoteItemDto],
    example: [
      { productId: '123e4567-e89b-12d3-a456-426614174000', quantity: 2 },
      { productId: '223e4567-e89b-12d3-a456-426614174001', quantity: 1 },
    ],
  })
  @IsArray({ message: 'Los items deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe incluir al menos un item' })
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  items: QuoteItemDto[];
}
