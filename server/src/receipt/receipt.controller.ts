import {
  Controller,
  Post,
  Get,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Controller('api/receipt')
export class ReceiptController {
  @Get()
  all() {
    throw new NotFoundException('No receipts found');
  }

  @Post()
  createReceipt() {
    throw new BadRequestException('Bad receipt');
  }
}
