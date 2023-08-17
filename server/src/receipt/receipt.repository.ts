import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { DatabaseTransactionActions } from 'src/database/utils';

@Injectable()
export class ReceiptRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getReceiptById(receiptId: number) {
    const sql = `
        SELECT 
            r.id as receipt_id, r.date as receipt_date,
            a.id as article_id, a.name as article_name, a.unit_price as article_unit_price, a.amount as article_amount,
            m.id as marketplace_id, m.name as marketplace_name, m.address as marketplace_address,
            cu.id as currency_id, cu.code as currency_code,
            ca.id as category_id, ca.name as category_name
        FROM receipts r
        INNER JOIN articles a ON a.receipt_id = r.id
        INNER JOIN marketplaces m ON m.id = r.marketplace_id
        INNER JOIN currencies cu ON cu.id = r.currency_id
        INNER JOIN categories ca ON ca.id = a.category_id
        WHERE r.id = $1`;
    const queryResult = await this.dbService.client.query(sql, [receiptId]);
    if (queryResult.rowCount === 0) return null;
    const receipt: any = {};
    queryResult.rows.forEach((article, index) => {
      if (index === 0) {
        receipt.currency = {
          id: article.currency_id,
          code: article.currency_code,
        };
        receipt.marketplace = {
          id: article.marketplace_id,
          name: article.marketplace_name,
          address: article.marketplace_address,
        };
        receipt.date = article.date;
        receipt.articles = [];
      }
      receipt.articles.push({
        id: article.article_id,
        name: article.article_name,
        unitPrice: parseFloat(article.article_unit_price),
        amount: parseFloat(article.article_amount),
      });
    });
    return receipt;
  }

  // TODO: Verify that date offsets are working correctly
  async getCurrentMonthSummary() {
    const sql = `
        SELECT 
            r.id as receipt_id, r.date as receipt_date,
            a.id as article_id, a.name as article_name, a.unit_price as article_unit_price, a.amount as article_amount,
            m.id as marketplace_id, m.name as marketplace_name, m.address as marketplace_address,
            cu.id as currency_id, cu.code as currency_code,
            ca.id as category_id, ca.name as category_name, ca.color as category_color, ca.icon as category_icon
        FROM receipts r
        INNER JOIN articles a ON a.receipt_id = r.id
        INNER JOIN marketplaces m ON m.id = r.marketplace_id
        INNER JOIN currencies cu ON cu.id = r.currency_id
        INNER JOIN categories ca ON ca.id = a.category_id
        WHERE r.date > date_trunc('month', now()) and r.date < date_trunc('month', now()) + interval '1month - 1ms'`;
    const queryResult = await this.dbService.client.query(sql);
    const receipts = [];
    queryResult.rows.forEach((row) => {
      let receipt = receipts.find((receipt) => receipt.id === row.receipt_id);
      if (!receipt) {
        receipt = {
          id: row.receipt_id,
          currency: {
            id: row.currency_id,
            code: row.currency_code,
          },
          marketplace: {
            id: row.marketplace_id,
            name: row.marketplace_name,
            address: row.marketplace_address,
          },
          date: row.date,
          articles: [],
        };
        receipts.push(receipt);
      }
      receipt.articles.push({
        id: row.article_id,
        category: {
          id: row.category_id,
          name: row.category_name,
          color: row.category_color,
          icon: row.category_icon,
        },
        unitPrice: parseFloat(row.article_unit_price),
        amount: parseFloat(row.article_amount),
      });
    });
    return receipts;
  }

  async getRecentReceipts() {
    const sql = `
        SELECT * 
        FROM (
            SELECT *
            FROM receipts
            ORDER BY date DESC
            LIMIT 5) as r
        INNER JOIN articles a ON a.receipt_id = r.id
        INNER JOIN marketplaces m ON m.id = r.marketplace_id
        INNER JOIN currencies cu ON cu.id = r.currency_id
        INNER JOIN categories ca ON ca.id = a.category_id
        `;
    const queryResult = await this.dbService.client.query(sql);
    const receipts = [];
    queryResult.rows.forEach((row) => {
      let receipt = receipts.find((receipt) => receipt.id === row.receipt_id);
      if (!receipt) {
        receipt = {
          id: row.receipt_id,
          currency: {
            id: row.currency_id,
            code: row.currency_code,
          },
          marketplace: {
            id: row.marketplace_id,
            name: row.marketplace_name,
            address: row.marketplace_address,
          },
          date: row.date,
          articles: [],
        };
        receipts.push(receipt);
      }
      receipt.articles.push({
        id: row.article_id,
        category: {
          id: row.category_id,
          name: row.category_name,
          color: row.category_color,
          icon: row.category_icon,
        },
        unitPrice: parseFloat(row.article_unit_price),
        amount: parseFloat(row.article_amount),
      });
    });
    return receipts;
  }

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
