import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private Product = [
    {
      id: 1,
      name: 'producto1',
      description: 'string',
      price: 250,
      stock: true,
      imgUrl: 'string',
    },
    {
      id: 2,
      name: 'producto2',
      description: 'string',
      price: 300,
      stock: true,
      imgUrl: 'string',
    },
    {
      id: 3,
      name: 'producto3',
      description: 'string',
      price: 500,
      stock: true,
      imgUrl: 'string',
    },
  ];
  async getProductRepository() {
    return this.Product;
  }
}
