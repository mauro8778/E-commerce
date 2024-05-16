import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Post('seeder')
  async addCategories(productId: string) {
    const categories = await this.categoriesService.getCategory(productId);
    return {categories};
  }
}
