import { BasicData } from '../../shared';

import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { text } from 'aws-sdk/clients/customerprofiles';

@Entity('invoice', { schema: 'order' })
export class Invoice extends BasicData {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar' })
  email?: string;

  @Column({ type: 'text' })
  note?: text;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'numeric', precision: 11, scale: 2, nullable: true })
  total: number;

  @Column({ type: 'numeric' })
  subTotal: number;

  @Column({ type: 'uuid' })
  orderId: string;

  @OneToOne(() => Order, (order) => order.invoice)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
