import { Module } from '@nestjs/common';
import { FileuUploadService } from './file-upload.service';
import { FileuUploadController } from './file-upload.controller';
import { FileupdateRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/Products/product.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ProductRepository])],
  providers: [FileuUploadService],
  controllers: [FileuUploadController,FileupdateRepository],
})
export class FileuUploadModule {}
