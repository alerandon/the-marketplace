import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  IsInt,
  IsPositive,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @IsUUID()
  @IsOptional()
  storeId: string;
}
