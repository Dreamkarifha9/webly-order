import { forwardRef, Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersModule } from '../orders.module';

import { OrderUsersController } from './order-users.controller';

@Module({
  controllers: [OrderUsersController],
  providers: [],
  imports: [
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
    forwardRef(() => OrdersModule),
  ],
})
export class OrderUsersModule { }
