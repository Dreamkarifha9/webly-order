import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderItemsModule } from './order-items/order-items.module';
import { Order } from './entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FxMakeOrderService } from './fx-make-order/fx-make-order.service';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { OrderUsersModule } from './order-users/order-users.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FxMakeOrderService],
  exports: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8081,
        },
      },
    ]),
    OrderItemsModule,
    InvoiceModule,
    OrderUsersModule,
  ],
})
export class OrdersModule { }
