import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';
import { UpdateInvoiceStatusDto } from 'src/invoice/dto/update-invoice-status.dto';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OrdersDto } from './dto/orders.dto';
import { SearchOrderDto } from './dto/search-order-dto';
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly invoiceService: InvoiceService,
  ) { }

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: OrdersDto,
  })
  findAll(@Query() query: SearchOrderDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':orderNo/orderNo')
  findOneByOrderNo(@Param('orderNo') orderNo: string) {
    return this.ordersService.findOneByOrderNo(orderNo);
  }

  @ApiBody({ type: CreateOrderDto })
  @Post('check-out')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() request: RequestWithUser,
  ) {
    const { id } = request.user;
    const response = await this.ordersService.create(createOrderDto, id);
    return response;
  }

  @Patch('invoice/:invoiceId/status')
  updateStatus(
    @Param('invoiceId') invoiceId: string,
    @Body() dto: UpdateInvoiceStatusDto,
  ) {
    dto.updatedBy = 'system';
    return this.invoiceService.updateStatus(invoiceId, dto);
  }
}
