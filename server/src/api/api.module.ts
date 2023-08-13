import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { MarketplaceModule } from 'src/marketplace/marketplace.module';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { WildcardModule } from 'src/wildcard/wildcard.module';

@Module({
  imports: [
    CurrencyModule,
    MarketplaceModule,
    CategoryModule,
    ReceiptModule,
    WildcardModule,
  ],
})
export class ApiModule {}
