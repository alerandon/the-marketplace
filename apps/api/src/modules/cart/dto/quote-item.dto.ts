import { IsUUID, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuoteItemDto {
  @ApiProperty({
    description: 'ID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'El productId debe ser un UUID válido' })
  productId: string;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
    minimum: 1,
  })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;
}
