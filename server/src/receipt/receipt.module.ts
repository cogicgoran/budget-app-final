import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';

@Module({
  controllers: [ReceiptController],
})
export class ReceiptModule {}
