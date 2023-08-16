import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { ReceiptRepository } from './receipt.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ReceiptService, ReceiptRepository],
  controllers: [ReceiptController],
})
export class ReceiptModule {}
