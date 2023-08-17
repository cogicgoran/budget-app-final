import {
  Controller,
  Post,
  Get,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptService } from './receipt.service';

@Controller('api/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get('recent-receipts')
  async getRecentReceipts() {
    return await this.receiptService.getRecentReceipts();
  }

  @Get('current-month-summary')
  async getCurrentMonthSummary() {
    return await this.receiptService.getCurrentMonthSummary();
  }

  @Get(':receiptId')
  async getReceipt(@Param('receiptId', ParseIntPipe) receiptId: number) {
    const receipt = await this.receiptService.getReceiptById(receiptId);
    if (!receipt) throw new NotFoundException('No receipt found');

    return receipt;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createReceipt(@Body() receiptData: CreateReceiptDto) {
    return await this.receiptService.createReceipt(receiptData);
  }
}
