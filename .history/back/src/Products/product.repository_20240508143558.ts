import { Injectable, NotFoundException, Param } from '@nestjs/common';
import *as seeder from '../seeder.json';
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
    const product = await this.productrepository.find(
      { skip: start, take: limit,
      relations:['category']
    },
    );
    if(!product){
      throw new NotFoundException(`no se encontraron productos disponibles`)
  }
  return product
}

  async getProductBD( ) {
    await Promise.all(seeder.map(async (productData) => {

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
      else {
        throw new  NotFoundException(`el producto ${productData.name} ya existe`);}
    }));
  }
  


  async getProductRepositoryById(@Param('id') id: string,relations: string[] = []) {
  const product = await this.productrepository.find({
       where: { id },
       relations:['category']
      })
      if(!product){
        throw new NotFoundException(`no se encontro el producto con id ${id}`)
      }
return product;
  }
  async createProductRepository(product: Partial<ProductEntity>) {
    const validarProduct= await this.productrepository.findOne({ where: { name: product.name } })
    if (validarProduct) {
      throw new NotFoundException(`el producto ${product.name} ya existe`);
    }
      return this.productrepository.save(product);
  }
  async updateProductRepository(id: string,update: Partial<ProductEntity>,):Promise<any> {
    const updateProduct = await this.productrepository.findOne({where :{id}});
    if (!updateProduct) {
      throw new NotFoundException(`no se encontro el producto con id ${id}`);
    }
    Object.assign(updateProduct, update);

    await this.productrepository.save(updateProduct);

    return `el producto con id ${id} actualizado con exito`;
  }
  async deleteProductRepository(id: string) {
    const deleteProduct: any = await this.productrepository.find({
      where: { id },
    });
    if (!deleteProduct) {
      throw new NotFoundException(`no se encontro el producto con id ${id}`);
    }

    await this.productrepository.delete(id);

    return `el producto con id ${id}  y nombre ${deleteProduct.name} se ah eliminado con exito`;
  }
}
