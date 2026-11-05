import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { RecommendationRequestDto, SemanticSearchDto } from './ai.dto';

@ApiTags('Inteligencia Artificial (AI Commerce)')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommendations')
  @ApiOperation({
    summary: 'Recomendador Inteligente de Productos (Cross-Selling con LLM)',
    description: 'Analiza el carrito del usuario y sugiere productos complementarios utilizando Gemini.',
  })
  @ApiResponse({ status: 200, description: 'Lista de recomendaciones generadas con justificación clínica/comercial' })
  async getRecommendations(@Body() dto: RecommendationRequestDto) {
    return this.aiService.getRecommendations(dto);
  }

  @Post('search')
  @ApiOperation({
    summary: 'Búsqueda Semántica en Lenguaje Natural',
    description: 'Interpreta la intención del comprador y filtra los productos más adecuados del catálogo.',
  })
  @ApiResponse({ status: 200, description: 'Resultados rankeados por relevancia semántica' })
  async semanticSearch(@Body() dto: SemanticSearchDto) {
    return this.aiService.semanticSearch(dto);
  }
}
