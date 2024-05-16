import { Controller, Get, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
constructor( private readonly categoriesService: CategoryService) {
    
}

    @Get()
    async getCategories(){
        return await this.c
    }

    @Post('seeder')
    async addCategories(){0
        const categories= await this.categoriesService.getCategories();
        return categories; 
    }
}
