import { Module } from '@nestjs/common';
import { WildcardController } from './wildcard.controller';

@Module({
  controllers: [WildcardController],
})
export class WildcardModule {}
