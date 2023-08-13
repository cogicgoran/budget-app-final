import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly dbService: DatabaseService) {}

  getCategories() {
    const sql = `SELECT * FROM categories`;
    return this.dbService.client.query(sql);
  }
}
