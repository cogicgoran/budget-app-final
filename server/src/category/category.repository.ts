import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCategoryDto } from './dto/create-category-dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getCategories(): Promise<
    Array<{ id: number; name: string; icon: string; color: string }>
  > {
    const sql = `SELECT * FROM categories`;
    const result = await this.dbService.client.query(sql);
    return result.rows;
  }

  async hasCategoryByName(categoryName: string) {
    const sql = `SELECT * FROM categories WHERE name = $1`;
    const queryResult = await this.dbService.client.query(sql, [categoryName]);
    return queryResult.rowCount > 0;
  }

  createCategory(categoryData: CreateCategoryDto) {
    const sql = `INSERT INTO categories(name, color, icon) VALUES ($1, $2, $3)`;
    return this.dbService.client.query(sql, [
      categoryData.name,
      categoryData.color,
      categoryData.icon,
    ]);
  }

  async getCategoriesById(categoryIds: Set<number>) {
    const idArray = Array.from(categoryIds);
    const sqlPlaceholder = idArray
      .map((_, index) => `$${index + 1}`)
      .join(', ');
    const sql = `SELECT (id) FROM categories WHERE id IN (${sqlPlaceholder})`;
    const queryResult = await this.dbService.client.query(sql, idArray);
    return queryResult.rows;
  }
}
