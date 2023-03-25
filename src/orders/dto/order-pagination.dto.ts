import { BaseDataDto } from '../../shared';

import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

export class OrderPaginationDto extends BaseDataDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  orderNo: string;
  @ApiProperty()
  orderDate: Date;
  @ApiProperty({ isArray: true, type: OrderItem })
  orderItems: OrderItem[];
  @ApiProperty()
  invoice: Invoice;
}
