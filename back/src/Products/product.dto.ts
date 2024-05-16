import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, } from 'class-validator';

export class ProductDto {
  /**
   * es el name tiene que ser un string de 50 caracteres y no nulo
   * @example "nokia 1100"
   */
  @IsString()
  name: string;

  /**
   * es el description tiene que ser un string de 100 caracteres y no nulo
   * @example "celular irrompible"
   */
  @IsString()
  description: string;

  /**
   * es el price tiene que ser un número y no nulo
   * @example 1200
   */
  @IsNumber()
  price: number;

  /**
   * es el stock tiene que ser un número y no nulo
   * @example 20
   */
  @IsNumber()
  stock: number;

  /**
   * es el imgUrl tiene que ser un string de 200 caracteres y no nulo
   * @example "https://picsum.photos/200"
   */
  @IsString()
  @IsOptional()
  imgUrl: string;
  

  /**
   * es el ID de la categoría asociada al producto
   */
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
