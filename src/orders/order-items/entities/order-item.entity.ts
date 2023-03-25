import { BasicData } from '../../../shared';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { IOrderItemsRawPrice } from '../interface/order-item.interface';
import { IOrderItemsRawData } from '../interface/order-item-raw-data.interface';

@Entity('order_items', { schema: 'order' })
export class OrderItem extends BasicData {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'int4', default: 0 })
  qty: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'uuid', nullable: false })
  skuId: string;

  @Column({ type: 'jsonb' })
  rawPrice: IOrderItemsRawPrice;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({ type: 'jsonb' })
  rawData: IOrderItemsRawData;
}
