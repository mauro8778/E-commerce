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
      name: "Product 1",
      description: "Description for Product 1",
      price: 9.99,
      stock: true,
      imgUrl: "https://example.com/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: 19.99,
      stock: false,
      imgUrl: "https://example.com/product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for Product 3",
      price: 14.99,
      stock: true,
      imgUrl: "https://example.com/product3.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description for Product 4",
      price: 29.99,
      stock: true,
      imgUrl: "https://example.com/product4.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description for Product 5",
      price: 24.99,
      stock: false,
      imgUrl: "https://example.com/product5.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      description: "Description for Product 6",
      price: 12.99,
      stock: true,
      imgUrl: "https://example.com/product6.jpg",
    },
    {
      id: 7,
      name: "Product 7",
      description: "Description for Product 7",
      price: 39.99,
      stock: false,
      imgUrl: "https://example.com/product7.jpg",
    },
    {
      id: 8,
      name: "Product 8",
      description: "Description for Product 8",
      price: 49.99,
      stock: true,
      imgUrl: "https://example.com/product8.jpg",
    },
    {
      id: 9,
      name: "Product 9",
      description: "Description for Product 9",
      price: 19.99,
      stock: true,
      imgUrl: "https://example.com/product9.jpg",
    },
    {
      id: 10,
      name: "Product 10",
      description: "Description for Product 10",
      price: 34.99,
      stock: false,
      imgUrl: "https://example.com/product10.jpg",
    },
  ];
  async getProductRepository() {
    return this.Products;
  }
}
