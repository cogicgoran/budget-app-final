import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { DatabaseTransactionActions } from 'src/database/utils';

@Injectable()
export class ReceiptRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async createReceipt(receiptData: CreateReceiptDto) {
    const dbClient = this.dbService.createClient();
    await dbClient.connect();
    try {
      // Setup
      const sqlReceiptInsertStatemenet = `INSERT INTO receipts(date, currency_id, marketplace_id) VALUES ($1, $2, $3) RETURNING id`;
      const ARTICLE_ITEMS_TO_INSERT = 6;
      const sqlArticlesValuePlaceholderText = receiptData.articles
        .map(
          (_, index) =>
            `($${index * ARTICLE_ITEMS_TO_INSERT + 1}, $${
              index * ARTICLE_ITEMS_TO_INSERT + 2
            }, $${index * ARTICLE_ITEMS_TO_INSERT + 3}, $${
              index * ARTICLE_ITEMS_TO_INSERT + 4
            }, $${index * ARTICLE_ITEMS_TO_INSERT + 5}, $${
              index * ARTICLE_ITEMS_TO_INSERT + 6
            })`,
        )
        .join(',');
      const sqlArticlesInsertStatement = `INSERT INTO articles(name, unit_price, amount, receipt_id, currency_id, category_id) VALUES ${sqlArticlesValuePlaceholderText}`;
      const sqlArticleValues = [];

      // Execution
      await dbClient.query(DatabaseTransactionActions.Begin);
      const receiptQueryResult = await dbClient.query(
        sqlReceiptInsertStatemenet,
        [receiptData.date, receiptData.currencyId, receiptData.marketplaceId],
      );
      receiptData.articles.forEach((article) =>
        sqlArticleValues.push(
          article.name,
          article.unitPrice,
          article.amount,
          receiptQueryResult.rows[0].id,
          receiptData.currencyId,
          article.categoryId,
        ),
      );
      await dbClient.query(sqlArticlesInsertStatement, sqlArticleValues);
      await dbClient.query(DatabaseTransactionActions.Commit);
    } catch (e) {
      await dbClient.query(DatabaseTransactionActions.Rollback);
      throw e;
    } finally {
      dbClient.end();
    }
  }
}
