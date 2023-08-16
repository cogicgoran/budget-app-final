import {
  Controller,
  Post,
  Get,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptService } from './receipt.service';

@Controller('api/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get()
  all() {
    throw new NotFoundException('No receipts found');
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createReceipt(@Body() receiptData: CreateReceiptDto) {
    return await this.receiptService.createReceipt(receiptData);
  }
}
