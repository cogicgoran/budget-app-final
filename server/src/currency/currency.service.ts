import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  getCurrencies() {
    return this.currencyRepository.getCurrencies();
  }
}
