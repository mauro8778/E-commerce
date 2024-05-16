import { Injectable } from '@nestjs/common';
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};
@Injectable()
export class ProductRepository {
  private Products: Product[] = [
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
  async getProductRepository() {
    return this.Products;
  }
}
