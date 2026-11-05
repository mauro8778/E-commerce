import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RecommendationRequestDto {
  @ApiProperty({
    description: 'Lista de IDs de productos en el carrito actual o visualizados',
    example: ['b53118f7-0808-41d7-b8db-4e924a4cf0ec'],
  })
  @IsArray()
  @IsNotEmpty()
  productIds: string[];

  @ApiPropertyOptional({
    description: 'Preferencias adicionales del usuario (ej: "presupuesto económico", "gaming")',
    example: 'gaming de alta gama',
  })
  @IsString()
  @IsOptional()
  userPreferences?: string;
}

export class SemanticSearchDto {
  @ApiProperty({
    description: 'Búsqueda en lenguaje natural del comprador',
    example: 'busco unos auriculares inalámbricos cómodos para hacer deporte con buena batería',
  })
  @IsString()
  @IsNotEmpty()
  query: string;
}
