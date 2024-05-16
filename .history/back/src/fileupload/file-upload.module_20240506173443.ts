import { Module } from '@nestjs/common';
import { FileuUploadService } from './file-upload.service';
import { FileuUploadController } from './file-upload.controller';
import { FileupdateRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../Products/product.repository';
import { ProductEntity } from '../Products/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity])],
  providers: [FileuUploadService,FileupdateRepository],
  controllers: [FileuUploadController],
})
export class FileuUploadModule {}
