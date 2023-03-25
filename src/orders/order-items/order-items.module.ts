import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';

import { OrderItem } from './entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemsModule { }
