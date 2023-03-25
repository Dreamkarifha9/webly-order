import { BaseDataDto, EOrderStatus } from '../../shared';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class InvoiceDto extends BaseDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  id?: string;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: EOrderStatus })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  subTotal: number;
}
