import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency-dto';

@Controller('api/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getCurrencies() {
    return await this.currencyService.getCurrencies();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCurrency(@Body() currencyData: CreateCurrencyDto) {
    const hasCurrencyWithSameCode =
      await this.currencyService.hasCurrencyByCode(currencyData.code);
    if (hasCurrencyWithSameCode) {
      throw new BadRequestException('Currency code already exists');
    }

    return await this.currencyService.createCurrency(currencyData);
  }
}
