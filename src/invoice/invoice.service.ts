import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { v4 as uuid } from 'uuid';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
@Injectable()
export class InvoiceService {
  private readonly logger: Logger = new Logger(InvoiceService.name);
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) { }
  public async mappingDto(
    order: Order,
    invoideDto: InvoiceDto,
  ): Promise<Invoice> {
    const { name, phone, status, email, note, total, subTotal } = invoideDto;

    const dto = await this.invoiceRepository.create({
      id: uuid(),
      name: name,
      phone: phone,
      email: email,
      note: note,
      total: total,
      subTotal: subTotal,
      status: status,
      order: order,
      createdBy: order.createdBy,
    });
    return dto;
  }
  async findInvoiceById(id: string): Promise<Invoice> {
    const row = await this.invoiceRepository.findOne({ where: { id } });
    if (!row) {
      throw new HttpException(`Invoice notFound`, HttpStatus.BAD_REQUEST);
    }
    return row;
  }

  async updateStatus(id: string, dto: UpdateInvoiceStatusDto) {
    try {
      const invoice = await this.findInvoiceById(id);
      invoice.status = dto.status;
      invoice.updatedAt = new Date();
      await this.invoiceRepository.update(id, invoice);

      return { message: 'Order status has been updated successfully.' };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
