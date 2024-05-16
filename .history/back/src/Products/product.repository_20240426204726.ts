import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { productDto } from './product.dto';

@Injectable()
export class ProductRepository {
  private Products: Product[] = [
    {
      id: '1',
      name: 'Iphone 15',
      description: 'The best smartphone in the world',
      price: 199.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'smartphone',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23',
      description: 'The best smartphone in the world',
      price: 150.0,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'smartphone',
    },
    {
      id: '3',
      name: 'Motorola Edge 40',
      description: 'The best smartphone in the world',
      price: 179.89,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'smartphone',
    },
    {
      id: '4',
      name: 'Samsung Odyssey G9',
      description: 'The best monitor in the world',
      price: 299.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'monitor',
    },
    {
      id: '5',
      name: 'LG UltraGear',
      description: 'The best monitor in the world',
      price: 199.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'monitor',
    },
    {
      id: '6',
      name: 'Acer Predator',
      description: 'The best monitor in the world',
      price: 150.0,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'monitor',
    },
    {
      id: '7',
      name: 'Razer BlackWidow V3',
      description: 'The best keyboard in the world',
      price: 99.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'keyboard',
    },
    {
      id: '8',
      name: 'Corsair K70',
      description: 'The best keyboard in the world',
      price: 79.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'keyboard',
    },
    {
      id: '9',
      name: 'Logitech G Pro',
      description: 'The best keyboard in the world',
      price: 59.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'keyboard',
    },
    {
      id: '10',
      name: 'Razer Viper',
      description: 'The best mouse in the world',
      price: 49.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'mouse',
    },
    {
      id: '11',
      name: 'Logitech G502 Pro',
      description: 'The best mouse in the world',
      price: 39.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'mouse',
    },
    {
      name: 'SteelSeries Rival 3',
      description: 'The best mouse in the world',
      price: 29.99,
      stock: 12,
      imgUrl: 'asdadsada',
      category: 'mouse',
    },
  ];
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.Products.slice(start, end);
  }
  async getProductRepositoryById(id: string) {
    return this.Products.find((product) => product.id == id);
  }
  async createProductRepository(product: Partial<productDto>) {
    const id = this.Products.length + 1;
    this.Products = await [...this.Products, { id, ...product }];
    return this.Products;
  }
  async updateProductRepository(
    id: string,
    update: Partial<productDto>,
  ): Promise<any> {
    const updateProduct = await this.Products.findIndex(
      (product) => product.id == id,
    );
    if (updateProduct !== -1) {
      this.Products[updateProduct] = { ...update, id };

      return id;
    }
    return null;
  }
  async deleteProductRepository(id: string) {
    const deleteProduct: any = await this.Products.findIndex(
      (product) => product.id == id,
    );
    if (deleteProduct !== 1) {
      const Delete = await this.Products.splice(deleteProduct, 1)[0];

      return Delete.id;
    }
    return null;
  }
}
