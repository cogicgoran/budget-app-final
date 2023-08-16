import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateReceiptArticleDto {
  @IsString({ message: 'Invalid aritcle name' })
  @IsNotEmpty({ message: 'Article name must not be empty' })
  name: string;

  @IsNumber(undefined, { message: 'Invalid article amount' })
  @IsPositive({ message: 'Article amount must be greater than 0' })
  amount: string;

  @IsNumber(undefined, { message: 'Invalid unit price' })
  @IsPositive({ message: 'Article unit price must be greater than 0' })
  unitPrice: number;

  @IsInt({ message: 'Invalid receipt category id' })
  @IsPositive({ message: 'Invalid receipt category id' })
  categoryId: number;
}

export class CreateReceiptDto {
  @IsInt({ message: 'Invalid currency id' })
  @IsPositive({ message: 'Invalid currency id' })
  currencyId: number;

  @IsInt({ message: 'Invalid marketplace id' })
  @IsPositive({ message: 'Invalid marketplace id' })
  marketplaceId: number;

  @IsISO8601({ strict: true }, { message: 'Invalid receipt date' })
  date: string;

  @IsArray({ message: 'Invalid receipt articles' })
  @ArrayMinSize(1, { message: 'At least 1 article is required' })
  @ValidateNested()
  @Type(() => CreateReceiptArticleDto)
  articles: Array<CreateReceiptArticleDto>;
}
