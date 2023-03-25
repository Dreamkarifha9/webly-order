import { EOrderStatus } from '../../shared';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInvoiceStatusDto {
  @ApiProperty({ enum: EOrderStatus })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  status: string;

  updatedBy?: string;
}
