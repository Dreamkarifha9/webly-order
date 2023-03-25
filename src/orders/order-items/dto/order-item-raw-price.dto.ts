import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderItemRawPriceDto {
  @ApiProperty()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @Type(() => Number)
  salePrice: number;
}
