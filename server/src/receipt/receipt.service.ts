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
  ) {}

  async getReceiptById(receiptId: number) {
    return this.receiptRepository.getReceiptById(receiptId);
  }

  getRecentReceipts() {
    return this.receiptRepository.getRecentReceipts();
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
}
