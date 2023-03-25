import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderItemRawDataDto {
  @ApiProperty()
  @Type(() => String)
  productName: string;
}
