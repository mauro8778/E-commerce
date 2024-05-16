import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { productDto } from './product.dto';

@Injectable()
export class ProductRepository {
  private Products: Product[] = [
    {
      id: '1',
      name: 'Smartphone X',
      description: 'A high-end smartphone with advanced features.',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/smartphoneX.jpg',
    },
    {
      id: '2',
      name: 'Laptop Pro',
      description: 'Powerful laptop for professionals and gamers.',
      price: 1499.99,
      stock: true,
      imgUrl: 'https://example.com/laptopPro.jpg',
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      description: 'Premium wireless headphones with noise-cancelling.',
      price: 199.99,
      stock: false,
      imgUrl: 'https://example.com/headphones.jpg',
    },
    {
      id: '4',
      name: 'Smart Watch',
      description: 'Fitness tracker and smartwatch with health monitoring.',
      price: 299.99,
      stock: true,
      imgUrl: 'https://example.com/smartwatch.jpg',
    },
    {
      id: '5',
      name: '4K Smart TV',
      description: 'Ultra HD smart TV with built-in streaming apps.',
      price: 799.99,
      stock: true,
      imgUrl: 'https://example.com/smartTV.jpg',
    },
    {
      id: '6',
      name: 'Gaming Console',
      description: 'Next-gen gaming console for immersive gameplay.',
      price: 499.99,
      stock: false,
      imgUrl: 'https://example.com/gamingConsole.jpg',
    },
    {
      id: '7',
      name: 'Digital Camera',
      description: 'Professional DSLR camera for photography enthusiasts.',
      price: 899.99,
      stock: true,
      imgUrl: 'https://example.com/camera.jpg',
    },
    {
      id: '8',
      name: 'Portable Speaker',
      description: 'Compact and powerful Bluetooth speaker for music lovers.',
      price: 79.99,
      stock: true,
      imgUrl: 'https://example.com/speaker.jpg',
    },
    {
      id: '9',
      name: 'Coffee Maker',
      description:
        'Automatic coffee maker for brewing delicious coffee at home.',
      price: 49.99,
      stock: true,
      imgUrl: 'https://example.com/coffeeMaker.jpg',
    },
    {
      id: '10',
      name: 'Robot Vacuum Cleaner',
      description: 'Smart robot vacuum for hands-free cleaning of your home.',
      price: 349.99,
      stock: true,
      imgUrl: 'https://example.com/vacuumCleaner.jpg',
    },
  ];
  async getProductRepository() {
    return this.Products;
  }
  async getProductRepositoryById(id: string) {
    return this.Products.find((product) => product.id == id);
  }
  async createProductRepository(product: productDto) {
    const id = this.Products.length + 1;
    this.Products = await [...this.Products, { id, ...product }];
    return this.Products;
  }
  async updateProductRepository(
    id: string,
    update: productDto,
  ): Promise<any | null> {
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
