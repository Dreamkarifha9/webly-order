import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { FXMakeOrderAlias } from './fx-make-order.dto';
import * as _ from 'lodash';
import { str as CRC32 } from 'crc-32';

@Injectable()
export class FxMakeOrderService {
  private readonly logger: Logger = new Logger(FxMakeOrderService.name);

  constructor(private readonly connection: Connection) { }

  public async makeOrderAlias() {
    const splitDailCode = 'WEBLY-';
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 10))
      .toString()
      .padStart(10, '0');
    this.logger.verbose('splitDailCode', splitDailCode[1]);
    const encrypCRC32 = (CRC32(randomNumber) >>> 0)
      .toString(16)
      .substring(0, 4);
    this.logger.verbose('encrypCRC32', encrypCRC32);
    const combine = encrypCRC32.toUpperCase().concat(splitDailCode);
    this.logger.verbose('combine', combine);
    const sql = 'SELECT public.fx_make_order_alias($1)';
    const params = [combine];
    const rows = await this.connection.query(sql, params);
    const row = _.first(rows) || {};
    const { fx_make_order_alias } = row;
    return { orderAlias: fx_make_order_alias } as FXMakeOrderAlias;
  }
}
