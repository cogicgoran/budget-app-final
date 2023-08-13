import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('api/marketplace')
export class MarketplaceController {
  
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get()
  async allMarketplaces() {
    return await this.marketplaceService.getAllMarketplaces();
  }

  @Post()
  createMarketplace() {
    throw new BadRequestException('Bad marketplace');
  }
}
