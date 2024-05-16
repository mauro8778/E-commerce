import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get('seeder')
  async addCategories( ) {

    
}
}
