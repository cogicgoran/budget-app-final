import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceRepository } from './marketplace.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MarketplaceService, MarketplaceRepository],
  controllers: [MarketplaceController],
})
export class MarketplaceModule {}
