import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Connection, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderItemsService } from './order-items/order-items.service';
import { v4 as uuid } from 'uuid';
import { FxMakeOrderService } from './fx-make-order/fx-make-order.service';
import { SearchOrderDto } from './dto/search-order-dto';

@Injectable()
export class OrdersService {
  private readonly logger: Logger = new Logger(OrdersService.name);
  constructor(
    private connection: Connection,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderItemService: OrderItemsService,
    private readonly invoiceService: InvoiceService,
    private readonly generateOrderNo: FxMakeOrderService,
  ) { }

  async findAll(query: SearchOrderDto) {
    const { status } = query;
    const active = true;
    const deleted = false;
    const foundOrder = await this.getJoinOrder()
      .where('invoice.status = :status', { status })
      .andWhere('orders.active = :active', { active })
      .andWhere('orders.deleted = :deleted', { deleted })
      .getMany();
    if (!foundOrder)
      throw new HttpException(`Order notFound `, HttpStatus.BAD_REQUEST);
    return foundOrder;
  }

  async findOneByUserId(userId: string) {
    const active = true;
    const deleted = false;
    const foundOrder = await this.getJoinOrder()
      .where('orders.userId = :userId', { userId })
      .andWhere('orders.active = :active', { active })
      .andWhere('orders.deleted = :deleted', { deleted })
      .getMany();
    if (!foundOrder)
      throw new HttpException(`Order notFound `, HttpStatus.BAD_REQUEST);
    return foundOrder;
  }

  async findOneByOrderNo(orderNo: string) {
    const active = true;
    const deleted = false;
    const foundOrder = await this.getJoinOrder()
      .where('orders.orderNo = :orderNo', { orderNo })
      .andWhere('orders.active = :active', { active })
      .andWhere('orders.deleted = :deleted', { deleted })
      .getMany();
    if (!foundOrder)
      throw new HttpException(`Order notFound `, HttpStatus.BAD_REQUEST);
    return foundOrder;
  }

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
    const { orderDetail, orderItems } = createOrderDto;
    // start transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // create order
      const orderDto = await this.mappingDto(userId);
      await queryRunner.manager.save(orderDto);

      // create order items
      const itemDtos = await this.orderItemService.mappingDto(
        orderDto,
        orderItems,
      );
      this.logger.debug(`display itemDtos ${JSON.stringify(itemDtos)}`);
      await queryRunner.manager.save(itemDtos);

      // create invoice
      const invoiceDto = await this.invoiceService.mappingDto(
        orderDto,
        orderDetail,
      );
      await queryRunner.manager.save(invoiceDto);

      await queryRunner.commitTransaction();
      return orderDto;
    } catch (error) {
      this.logger.debug(error);
      await queryRunner.rollbackTransaction();

      throw new HttpException(`${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async mappingDto(userId: string): Promise<Order> {
    const id = uuid();
    const createdBy = 'system';
    const { orderAlias } = await this.generateOrderNo.makeOrderAlias();
    const dto = this.orderRepository.create({
      id: id,
      userId,
      orderNo: orderAlias,
      orderDate: new Date(),
      createdBy: createdBy,
    });
    return dto;
  }
  private getJoinOrder() {
    const deleted = false;
    return this.orderRepository
      .createQueryBuilder('orders')
      .select(['orders'])
      .leftJoin(
        'orders.orderItems',
        'orderItems',
        'orderItems.deleted = :deleted',
        { deleted },
      )
      .addSelect(['orderItems'])
      .leftJoin('orders.invoice', 'invoice', 'invoice.deleted = :deleted', {
        deleted,
      })
      .addSelect(['invoice']);
  }
}
