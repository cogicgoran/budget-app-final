import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptRepository } from './receipt.repository';
import { CategoryService } from 'src/category/category.service';
import { CurrencyService } from 'src/currency/currency.service';
import { MarketplaceService } from 'src/marketplace/marketplace.service';
import { ReceiptHelper } from './receipt.helper';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly receiptRepository: ReceiptRepository,
    private readonly categoryService: CategoryService,
    private readonly currencyService: CurrencyService,
    private readonly marketplaceService: MarketplaceService,
  ) { }

  async getReceiptById(receiptId: number) {
    return this.receiptRepository.getReceiptById(receiptId);
  }

  getRecentReceipts() {
    return this.receiptRepository.getRecentReceipts();
  }

  getAllReceipts() {
    return this.receiptRepository.getAllReceipts();
  }

  async getCurrentMonthSummary() {
    const receipts = await this.receiptRepository.getCurrentMonthSummary();
    const summary = ReceiptHelper.createSummary(receipts);
    return summary;
  }

  async createReceipt(receiptData: CreateReceiptDto) {
    const uniqueArticleCategoryIds = new Set(
      receiptData.articles.map((article) => article.categoryId),
    );
    const currencyId = receiptData.currencyId;
    const marketplaceId = receiptData.marketplaceId;
    await Promise.all([
      this.categoryService.checkCategoryAvailability(uniqueArticleCategoryIds),
      this.currencyService.checkCurrencyAvailability(currencyId),
      this.marketplaceService.checkMarketplaceAvailability(marketplaceId),
    ]);
    return this.receiptRepository.createReceipt(receiptData);
  }

  buildReceiptsReport(receipts: Array<any>) {
    return receipts.map((receipt: any) => {
      const total = receipt.articles.reduce(
        (total, article) => total + article.amount * article.unitPrice,
        0,
      );
      const mostSpentCategory = this.getReceiptMostSpentCategory(receipt);
      return {
        ...receipt,
        total,
        mostSpentCategory,
      };
    });
  }

  getReceiptMostSpentCategory(receipt: any) {
    const categoryPrices = new Map();
    receipt.articles.forEach((article) => {
      categoryPrices.set(
        article.category.id,
        (categoryPrices.get(article.category.id) ?? 0) +
        article.unitPrice * article.amount,
      );
    });
    const maxObj = { id: null, value: -1 };
    categoryPrices.forEach((val, key) => {
      if (val > maxObj.value) {
        maxObj.id = key;
        maxObj.value = val;
      }
    });
    return receipt.articles.find(
      (article) => article.category.id === maxObj.id,
    )!.category;
  }

  buildRecentCategoriesReport(receipts: Array<any>) {
    const recentCategories = new Map<string, any>();
    receipts
      .slice()
      .reverse()
      .forEach((receipt) => {
        receipt.articles.some((article) => {
          if (recentCategories.size === 5) return;
          if (!recentCategories.has(article.category.name)) {
            recentCategories.set(article.category.name, article.category);
          }
          if (recentCategories.size === 5) return true;
          return false;
        });
      });
    return Array.from(recentCategories.values());
  }
}
