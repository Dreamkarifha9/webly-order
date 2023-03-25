import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class OrderItemsService {
  private readonly logger: Logger = new Logger(OrderItemsService.name);
  constructor(
    private connection: Connection,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) { }

  public async mappingDto(
    order: Order,
    orderItemDtos: OrderItemDto[],
  ): Promise<OrderItem[]> {
    const itemDtos = [];
    this.logger.debug(`order display ${JSON.stringify(order)}`);
    this.logger.debug(`orderItemDtos display ${JSON.stringify(orderItemDtos)}`);

    for await (const item of orderItemDtos) {
      const dto = {
        id: uuid(),
        qty: item.qty,
        price: item.price,
        rawPrice: item.rawPrice,
        productId: item.productId,
        skuId: item.skuId,
        order: order,
        createdBy: order.createdBy,
        rawData: item.rawData,
      };
      const orderItem = await this.orderItemRepository.create(dto);
      itemDtos.push(orderItem);
    }
    return itemDtos;
  }
}
