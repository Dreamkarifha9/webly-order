import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import { OrdersService } from '../orders.service';

@ApiTags('Order - Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('order-users')
export class OrderUsersController {
  constructor(private readonly ordersService: OrdersService) { }
  @Get('user')
  findOneByUserId(@Req() request: RequestWithUser) {
    const { id } = request.user;
    return this.ordersService.findOneByUserId(id);
  }
}
