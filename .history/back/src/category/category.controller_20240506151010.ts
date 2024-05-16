import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get('sheeder')
  async addCategories( ) {

    return this.categoriesService.addCategory();

    
}
@Get('all')
async getCategory() {
  return this.categoriesService.getCategory();
}
}
