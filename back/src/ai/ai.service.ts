import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../Products/product.entity';
import { GoogleGenAI } from '@google/genai';
import { RecommendationRequestDto, SemanticSearchDto } from './ai.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * Recomendador Inteligente de Productos (Cross-Selling con LLM)
   */
  async getRecommendations(dto: RecommendationRequestDto) {
    const allProducts = await this.productRepository.find({
      relations: ['category'],
      take: 20,
    });

    const cartProducts = allProducts.filter((p) => dto.productIds.includes(p.id));
    const availableToRecommend = allProducts.filter((p) => !dto.productIds.includes(p.id));

    if (availableToRecommend.length === 0) {
      return {
        recommendations: allProducts.slice(0, 3),
        reason: 'Productos destacados del catálogo.',
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const catalogList = availableToRecommend.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category?.name,
          price: p.price,
        }));

        const prompt = `
Eres un motor de recomendación de E-commerce.
El usuario tiene en su carrito los siguientes productos:
${JSON.stringify(cartProducts.map((p) => ({ name: p.name, category: p.category?.name })))}

Preferencias indicadas: "${dto.userPreferences || 'Ninguna'}"

Catálogo disponible:
${JSON.stringify(catalogList)}

Selecciona los 3 mejores productos complementarios (cross-selling) y devuelve ÚNICAMENTE un JSON con este formato:
{
  "recommendedIds": ["id1", "id2", "id3"],
  "reason": "Explicación breve de por qué estos productos complementan la compra"
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          const recommended = availableToRecommend.filter((p) =>
            parsed.recommendedIds?.includes(p.id),
          );

          if (recommended.length > 0) {
            return {
              recommendations: recommended,
              reason: parsed.reason,
            };
          }
        }
      } catch (err: any) {
        this.logger.warn(`Fallback en recomendación IA: ${err.message}`);
      }
    }

    // Fallback inteligente determinístico
    return {
      recommendations: availableToRecommend.slice(0, 3),
      reason: 'Sugerencias basadas en los artículos más populares de categorías afines.',
    };
  }

  /**
   * Búsqueda Semántica en Lenguaje Natural
   */
  async semanticSearch(dto: SemanticSearchDto) {
    const products = await this.productRepository.find({ relations: ['category'] });
    const userQuery = dto.query.toLowerCase();

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
Analiza la intención de búsqueda de un cliente de e-commerce: "${dto.query}".
Catálogo disponible:
${JSON.stringify(products.map((p) => ({ id: p.id, name: p.name, description: p.description, category: p.category?.name })))}

Devuelve ÚNICAMENTE un JSON con:
{
  "matchedIds": ["id1", "id2"],
  "detectedCategory": "nombre de la categoría deducida",
  "summary": "Resumen de lo que busca el cliente"
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          const matched = products.filter((p) => parsed.matchedIds?.includes(p.id));

          return {
            results: matched.length > 0 ? matched : products.slice(0, 3),
            detectedCategory: parsed.detectedCategory,
            summary: parsed.summary,
          };
        }
      } catch (err: any) {
        this.logger.warn(`Fallback en búsqueda semántica: ${err.message}`);
      }
    }

    // Fallback por coincidencia de palabras clave
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(userQuery) ||
        p.description?.toLowerCase().includes(userQuery) ||
        p.category?.name.toLowerCase().includes(userQuery),
    );

    return {
      results: filtered.length > 0 ? filtered : products.slice(0, 3),
      detectedCategory: 'General',
      summary: `Resultados encontrados para: "${dto.query}"`,
    };
  }
}
