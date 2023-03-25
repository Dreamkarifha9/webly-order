import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
@Module({
  controllers: [],
  providers: [InvoiceService],
  exports: [InvoiceService],
  imports: [TypeOrmModule.forFeature([Invoice])],
})
export class InvoiceModule { }
