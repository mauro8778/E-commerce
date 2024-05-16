import { Controller, Get, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {

    constructor() {
    }
    @Get()
    getCategories(){}

    @Post()
    addCategories(){}
}
