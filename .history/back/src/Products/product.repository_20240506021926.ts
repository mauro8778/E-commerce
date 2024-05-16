import { Injectable, NotFoundException, Param } from '@nestjs/common';
import *as sheeder from '../sheeder.json';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';

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
    return this.productrepository.find(
      { skip: start, take: limit,
      relations:['category']
    },
    );
  }

  async getProductBD( ) {
    await Promise.all(sheeder.map(async (productData) => {
      const productName = productData.name.toLowerCase();
  
      const existingProduct = await this.productrepository.findOne({ where: { name: productName } });
  
      if (!existingProduct) {
        let category = await this.categoryRepository.findOne({ where: { name: productData.category } }); 

        
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
  


  async getProductRepositoryById(@Param('id') id: string,relations: string[] = []) {
  const product = await this.productrepository.find({
       where: { id },
       relations:['category']
      
      })

      console.log("q hay en product",product)
      if(!product){
        throw new NotFoundException(`no se encontro el producto con id ${id}`)
      }
return product;
  }
  async createProductRepository(productrepository: Partial<ProductEntity>) {
    
    const validarProduct= await this.productrepository.findOne({ where: { name: productrepository.name } })
    if (validarProduct) {
      throw new NotFoundException(`el producto ${productrepository.name} ya existe`);
    }
    
    return this.productrepository.save(productrepository);
  }
  async updateProductRepository(
    id: string,
    update: Partial<ProductEntity>,
  ): Promise<any> {
    const updateProduct = await this.productrepository.findOne({where :{id}});
    if (!updateProduct) {
      throw new NotFoundException(`no se encontro el producto con id ${id}`);
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
      throw new NotFoundException(`no se encontro el producto con id ${id}`);
    }

    await this.productrepository.delete(id);

    return id;
  }
}
