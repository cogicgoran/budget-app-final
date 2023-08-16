import { Injectable } from '@nestjs/common';
import { MarketplaceRepository } from './marketplace.repository';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';

@Injectable()
export class MarketplaceService {
  constructor(private readonly marketplaceRepository: MarketplaceRepository) {}

  getAllMarketplaces() {
    return this.marketplaceRepository.getAllMarketplaces();
  }

  createMarketplace(marketplaceData: CreateMarketplaceDto) {
    return this.marketplaceRepository.createMarketplace(marketplaceData);
  }

  hasMarketplace(marketplaceName: string, marketplaceAddress: string) {
    return this.marketplaceRepository.hasMarketplace(
      marketplaceName,
      marketplaceAddress,
    );
  }
}
