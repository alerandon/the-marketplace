import { ApiProperty } from '@nestjs/swagger';

export class QuoteItemResponseDto {
  @ApiProperty({
    description: 'ID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  productId: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Coca Cola 2L',
  })
  name: string;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 10.5,
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad solicitada',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Subtotal (precio × cantidad)',
    example: 21.0,
  })
  subtotal: number;
}

export class QuoteResponseDto {
  @ApiProperty({
    description: 'Lista de items con subtotales calculados',
    type: [QuoteItemResponseDto],
  })
  items: QuoteItemResponseDto[];

  @ApiProperty({
    description: 'Total de la cotización',
    example: 36.0,
  })
  total: number;

  @ApiProperty({
    description: 'Cantidad total de items (suma de cantidades)',
    example: 3,
  })
  itemCount: number;
}
