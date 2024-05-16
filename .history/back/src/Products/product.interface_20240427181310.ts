import { CategoryEntity } from "src/category/category.entity";

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  category: CategoryEntity;
}
