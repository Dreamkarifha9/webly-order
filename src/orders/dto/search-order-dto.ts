import { EOrderStatus } from '../../shared';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchOrderDto {
  @ApiPropertyOptional({ enum: EOrderStatus })
  @IsOptional()
  status?: string;

  userId: string;
}
