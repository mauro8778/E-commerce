import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private Product = [
    {
      id: 1,
      name: 'producto1',
      description: 'strasdasdaing',
      price: 250,
      stock: true,
      imgUrl: 'strasdasding',
    },
    {
      id: 2,
      name: 'producto2',
      description: 'stasdadsring',
      price: 300,
      stock: true,
      imgUrl: 'strasdasdaing',
    },
    {
      id: 3,
      name: 'producto3',
      description: 'asdadad',
      price: 500,
      stock: true,
      imgUrl: 'striasdsadadng',
    },
  ];
  getProductRepository() {
    return this.Product;
  }
}
