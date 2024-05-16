import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, OnModuleInit} from '@nestjs/common';
import *as seeder from '../seeder.json';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';


@Injectable()
export class ProductRepository implements OnModuleInit {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productrepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async onModuleInit() {
  await this.getProductBD()
}
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    if(!page||!limit){
      page=1;
      limit=5
    }
    const product = await this.productrepository.find(
      { skip: start, take: limit,
      relations:['category']
    },
    );
    if(product.length === 0 ){
      return null
    }
    return product
}



  async getProductBD( ) {
    await Promise.all(seeder.map(async (productData) => {

      

  
      const existingProduct = await this.productrepository.findOne({ where: { name: productData.name } });
  
      if (!existingProduct) 
        {

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
        console.warn(`el producto ${productData.name} ya existe`);}
    }));
  }
  


  async getProductRepositoryById( id: string,relations: string[] = []) {
    
    const product = await this.productrepository.findOne({
       where: { id },
       relations:['category']
      })
      if(!product){
        throw new NotAcceptableException('no corresponde a un id valido')
      }
      
return product;
  }
  async createProductRepository(product: Partial<ProductEntity>, categorId:string) {
    const validarProduct= await this.productrepository.findOne({ where: { name: product.name } })
    if (validarProduct) {
      throw new NotFoundException(`el producto ${product.name} ya existe`);
    }
    const categories= await this.categoryRepository.findOneBy({id:categorId,})

      if(!categories){
        throw new NotFoundException(`la categoria no existe`)
      }

      const newProduct= await this.productrepository.create(
       { ...product,category:categories}
      )
      return this.productrepository.save(newProduct);
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

  async SumStock(id:string,stock:number){
   
    
    const product = await this.productrepository.findOne({where:{id}})

    if(!product){
      throw new NotFoundException('no se encontro producto')

    }
    const newStock = product.stock + stock
    product.stock = newStock
    await this.productrepository.save(product)

   return `al producto con id ${id} se le actualizo el stock con exito  `

  }
}
