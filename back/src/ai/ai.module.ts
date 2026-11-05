import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../Products/product.entity';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
