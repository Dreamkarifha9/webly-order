import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { OrderItemDto } from '../order-items/dto/order-item.dto';
import { InvoiceDto } from 'src/invoice/dto/invoice.dto';

export class OrderItem extends OmitType(OrderItemDto, [
  'id',
  'active',
  'deleted',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy',
]) { }
export class Invoice extends OmitType(InvoiceDto, [
  'id',
  'active',
  'deleted',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy',
]) { }

export class OrderDto {
  @ApiProperty({ type: OrderItem, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  orderItems: OrderItem[];

  @ApiProperty({ type: Invoice })
  @ValidateNested()
  @IsNotEmptyObject()
  orderDetail: Invoice;
}
