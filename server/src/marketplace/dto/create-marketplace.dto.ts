import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarketplaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
