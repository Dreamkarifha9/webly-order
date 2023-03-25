import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FXMakeOrderAlias {
  @ApiProperty()
  @Type(() => String)
  orderAlias: string;
}
