import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return await this.categoryService.getCategories();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    const hasCategoryByName = await this.categoryService.hasCategoryByName(
      categoryData.name,
    );
    if (hasCategoryByName) {
      throw new BadRequestException('Category name already exists');
    }

    await this.categoryService.createCategory(categoryData);
  }
}
