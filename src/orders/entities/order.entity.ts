import { BasicData } from '../../shared';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Entity('orders', { schema: 'order' })
export class Order extends BasicData {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  orderNo: string;

  @Column({ type: 'timestamptz' })
  orderDate: Date;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @OneToMany(() => OrderItem, (orderItems) => orderItems.order)
  orderItems: OrderItem[];

  @OneToOne(() => Invoice, (invoice) => invoice.order)
  invoice: Invoice;
}
