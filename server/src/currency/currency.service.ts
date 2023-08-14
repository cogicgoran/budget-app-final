import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';
import { CreateCurrencyDto } from './dto/create-currency-dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  getCurrencies() {
    return this.currencyRepository.getCurrencies();
  }

  hasCurrencyByCode(currencyCode: string) {
    return this.currencyRepository.hasCurrencyByCode(currencyCode);
  }

  createCurrency(currencyData: CreateCurrencyDto) {
    return this.currencyRepository.createCurrency(currencyData);
  }
}
