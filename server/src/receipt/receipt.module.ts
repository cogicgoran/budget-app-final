import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { ReceiptRepository } from './receipt.repository';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryModule } from 'src/category/category.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { MarketplaceModule } from 'src/marketplace/marketplace.module';

@Module({
  imports: [DatabaseModule, CategoryModule, CurrencyModule, MarketplaceModule],
  providers: [ReceiptService, ReceiptRepository],
  controllers: [ReceiptController],
})
export class ReceiptModule {}
