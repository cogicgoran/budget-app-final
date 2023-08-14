import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCurrencyDto } from './dto/create-currency-dto';

@Injectable()
export class CurrencyRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getCurrencies(): Promise<Array<{ id: string; code: string }>> {
    const sql = `SELECT * FROM currencies`;
    const queryResult = await this.dbService.client.query(sql);
    return queryResult.rows;
  }

  async hasCurrencyByCode(currencyCode: string) {
    const sql = `SELECT * FROM currencies WHERE code = $1`;
    const queryResult = await this.dbService.client.query(sql, [currencyCode]);
    return queryResult.rowCount > 0;
  }

  createCurrency(currencyData: CreateCurrencyDto) {
    const sql = `INSERT INTO currencies(code) VALUES ($1)`;
    return this.dbService.client.query(sql, [currencyData.code]);
  }
}
