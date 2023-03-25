import { BaseDataDto } from '../../../shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderItemRawDataDto } from './order-item-raw-data.dto';
import { OrderItemRawPriceDto } from './order-item-raw-price.dto';

export class OrderItemDto extends BaseDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  id?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  qty: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  skuId: string;

  @ApiProperty({ type: OrderItemRawPriceDto })
  @IsNotEmpty()
  rawPrice: OrderItemRawPriceDto;

  @ApiProperty({ type: OrderItemRawDataDto })
  @IsNotEmpty()
  rawData: OrderItemRawDataDto;
}
