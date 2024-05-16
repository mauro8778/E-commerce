import { Injectable, OnModuleInit } from '@nestjs/common';
import { sheeder } from '../sheeder.product';
import { ProductEntity } from './product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productrepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.productrepository.find({ skip: start, take: limit });
  }

  async getProductBD() {
    await Promise.all(sheeder.map(async (productData) => {
        const productName = productData.name.toLowerCase();

        const existingProduct = await this.productrepository.findOne({ where: { name: productData.name } });

        if (!existingProduct) {
            const categoryName = productData.category.toLowerCase();
            let category = await this.categoryRepository.findOne({ where: { name: categoryName } });

            if (!categoryName) {
                category = await this.categoryRepository.create({ name: categoryName });
                await this.categoryRepository.save(category);
            }

            const product = this.productrepository.create({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                imgUrl: productData.imgUrl,
                category: category 
            });

            await this.productrepository.save(product);
        }
    }));
}



  async getProductRepositoryById(id: string) {
    return await this.productrepository.find({ where: { id } });
  }
  async createProductRepository(productrepository: Partial<ProductEntity>) {
    
    const validarProduct= await this.productrepository.findOne({ where: { name: productrepository.name } })
    if (validarProduct) {
      return "producto duplicado"
    }
    
    return this.productrepository.save(productrepository);
  }
  async updateProductRepository(
    id: string,
    update: Partial<ProductEntity>,
  ): Promise<any> {
    const updateProduct = await this.productrepository.findOne({where :{id}});
    if (!updateProduct) {
      return null;
    }

    Object.assign(updateProduct, update);
    await this.productrepository.save(updateProduct);
    return id;
  }
  async deleteProductRepository(id: string) {
    const deleteProduct: any = await this.productrepository.find({
      where: { id },
    });
    if (!deleteProduct) {
      return null;
    }

    await this.productrepository.delete(id);

    return id;
  }
}
