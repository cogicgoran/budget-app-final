import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';

@Controller('api/marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get()
  async allMarketplaces() {
    return await this.marketplaceService.getAllMarketplaces();
  }

  @Post()
  @UsePipes()
  async createMarketplace(@Body() marketplaceData: CreateMarketplaceDto) {
    const hasExistingMarketplace = await this.marketplaceService.hasMarketplace(
      marketplaceData.name,
      marketplaceData.address,
    );
    if (hasExistingMarketplace)
      throw new BadRequestException('Given marketplace already exists');

    return await this.marketplaceService.createMarketplace(marketplaceData);
  }
}
