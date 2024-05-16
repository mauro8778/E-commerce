import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Post('seeder')
  async addCategories() {
    0;
    const categories = await this.categoriesService.getCategory();
    return {categories};
  }
}
