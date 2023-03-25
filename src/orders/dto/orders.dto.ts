import { IResponse } from '../../shared';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPaginationDto } from './order-pagination.dto';

export class OrdersDto implements IResponse<OrderPaginationDto[]> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  error: string[];

  @ApiProperty({
    type: OrderPaginationDto,
    isArray: true,
  })
  data: OrderPaginationDto[];

  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  perPage?: number;

  @ApiProperty()
  totalPage?: number;

  @ApiProperty()
  total?: number;
}
