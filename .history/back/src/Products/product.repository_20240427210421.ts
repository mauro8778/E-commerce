import { Injectable, OnModuleInit } from '@nestjs/common';
import { sheeder } from '../sheeder.product';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductRepository {
  constructor(
  @InjectRepository(ProductEntity)
 private readonly productrepository: Repository<ProductEntity>,
){}
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.productrepository.find({ skip: start, take: limit });

  }

  async getProductBD(){
    
    await Promise.all(sheeder.map((productdata)=>{

      
     
    
        const product  = this.productrepository.create(productdata);
      return this.productrepository.save(productdata);
    
    
    }));

      }
  async getProductRepositoryById(id: string) {
    return await this.productrepository.find({where: {id}});
  }
  async createProductRepository(productrepository: Partial<ProductEntity>) {
    return this.productrepository.save(productrepository);
  }
  async updateProductRepository(id: string, update: Partial<ProductEntity>): Promise<any> {
    const updateProduct = await this.productrepository.find({where: {id}})
    if(!updateProduct) {return null;}
    await this.productrepository.update(id,update)
    return id;
    }
  async deleteProductRepository(id: string) {
    const deleteProduct: any = await this.productrepository.find({where: {id}})
    if(!deleteProduct) {return null;}

    await this.productrepository.delete(id);

      return id;
    }
}
