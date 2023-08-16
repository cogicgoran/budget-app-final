import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { CurrencyRepository } from './currency.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CurrencyService, CurrencyRepository],
  controllers: [CurrencyController],
  exports: [CurrencyService],
})
export class CurrencyModule {}
