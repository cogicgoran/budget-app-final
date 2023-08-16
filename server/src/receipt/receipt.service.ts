import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptRepository } from './receipt.repository';

@Injectable()
export class ReceiptService {
  constructor(private readonly receiptRepository: ReceiptRepository) {}

  createReceipt(receiptData: CreateReceiptDto) {
    return this.receiptRepository.createReceipt(receiptData);
  }
}
