import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category-dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getCategories() {
    return this.categoryRepository.getCategories();
  }

  hasCategoryByName(categoryName: string) {
    return this.categoryRepository.hasCategoryByName(categoryName);
  }

  createCategory(categoryData: CreateCategoryDto) {
    return this.categoryRepository.createCategory(categoryData);
  }
}
