import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';

@Injectable()
export class MarketplaceRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllMarketplaces() {
    const queryResult = await this.dbService.client.query(
      'SELECT * FROM marketplaces',
    );
    return queryResult.rows;
  }

  async getMarketplaceById(marketplaceId: number) {
    const sql = `SELECT * FROM marketplaces WHERE id = $1`;
    const queryResult = await this.dbService.client.query(sql, [marketplaceId]);
    return queryResult.rows[0];
  }

  async createMarketplace(marketplaceData: CreateMarketplaceDto) {
    const sql = `INSERT INTO marketplaces(name, address) VALUES ($1, $2) RETURNING *`;
    const queryResult = await this.dbService.client.query(sql, [
      marketplaceData.name,
      marketplaceData.address,
    ]);
    const insertedItem = queryResult.rows[0];
    return insertedItem;
  }

  async hasMarketplace(marketplaceName: string, marketplaceAddress: string) {
    const sql = `SELECT (id) FROM marketplaces WHERE name = $1 AND ADDRESS = $2`;
    const queryResult = await this.dbService.client.query(sql, [
      marketplaceName,
      marketplaceAddress,
    ]);
    return queryResult.rowCount > 0;
  }
}
