import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as seeder from '../seeder.json';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { getCache, setCache, deleteCache } from '../config/redis.config';

@Injectable()
export class ProductRepository implements OnModuleInit {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productrepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async onModuleInit() {
    await this.getProductBD();
  }

  /**
   * Catálogo con estrategia Cache-Aside en Redis.
   * Reduce drásticamente la latencia y la carga en PostgreSQL para alto volumen de usuarios.
   */
  async getProductRepository(page: number = 1, limit: number = 5) {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.max(1, Math.min(50, limit || 5));
    const start = (validPage - 1) * validLimit;

    const cacheKey = `products:page:${validPage}:limit:${validLimit}`;
    const cached = await getCache<ProductEntity[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const products = await this.productrepository.find({
      skip: start,
      take: validLimit,
      relations: ['category'],
    });

    if (products.length === 0) {
      return null;
    }

    await setCache(cacheKey, products, 180); // 3 minutos de caché

    return products;
  }

  async getProductBD() {
    try {
      await Promise.all(
        seeder.map(async (productData) => {
          const existingProduct = await this.productrepository.findOne({ where: { name: productData.name } });

          if (!existingProduct) {
            let category = await this.categoryRepository.findOne({ where: { name: productData.category } });

            const product = this.productrepository.create({
              name: productData.name,
              description: productData.description,
              price: productData.price,
              stock: productData.stock,
              imgUrl: productData.imgUrl,
              category: category,
            });

            await this.productrepository.save(product);
          }
        }),
      );
    } catch (e: any) {
      console.warn('Aviso en el sembrado de productos iniciales:', e.message);
    }
  }

  async getProductRepositoryById(id: string, relations: string[] = []) {
    const cacheKey = `product:${id}`;
    const cached = await getCache<ProductEntity>(cacheKey);
    if (cached) {
      return cached;
    }

    const product = await this.productrepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`No se encontró el producto con id ${id}`);
    }

    await setCache(cacheKey, product, 300);

    return product;
  }

  async createProductRepository(product: Partial<ProductEntity>, categorId: string) {
    const validarProduct = await this.productrepository.findOne({ where: { name: product.name } });
    if (validarProduct) {
      throw new BadRequestException(`El producto "${product.name}" ya existe`);
    }

    const categories = await this.categoryRepository.findOneBy({ id: categorId });
    if (!categories) {
      throw new NotFoundException(`La categoría no existe`);
    }

    const newProduct = this.productrepository.create({ ...product, category: categories });
    const saved = await this.productrepository.save(newProduct);

    await deleteCache('products:*');

    return saved;
  }

  async updateProductRepository(id: string, update: Partial<ProductEntity>): Promise<any> {
    const updateProduct = await this.productrepository.findOne({ where: { id } });
    if (!updateProduct) {
      throw new NotFoundException(`No se encontró el producto con id ${id}`);
    }

    Object.assign(updateProduct, update);
    await this.productrepository.save(updateProduct);

    await deleteCache('products:*');
    await deleteCache(`product:${id}`);

    return `El producto con id ${id} fue actualizado con éxito`;
  }

  async deleteProductRepository(id: string) {
    const deleteProduct = await this.productrepository.findOne({ where: { id } });
    if (!deleteProduct) {
      throw new NotFoundException(`No se encontró el producto con id ${id}`);
    }

    await this.productrepository.delete(id);

    await deleteCache('products:*');
    await deleteCache(`product:${id}`);

    return `El producto con id ${id} y nombre ${deleteProduct.name} se ha eliminado con éxito`;
  }

  async SumStock(id: string, stock: number) {
    const product = await this.productrepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('No se encontró el producto');
    }

    product.stock += stock;
    await this.productrepository.save(product);

    await deleteCache('products:*');
    await deleteCache(`product:${id}`);

    return `Al producto con id ${id} se le actualizó el stock con éxito`;
  }
}
