import { Module } from '@nestjs/common';
import { FileuUploadService } from './file-upload.service';
import { FileuUploadController } from './file-upload.controller';
import { FileupdateRepository } from './file-upload.repository';

@Module({
  providers: [FileuUploadService],
  controllers: [FileuUploadController,FileupdateRepository],
})
export class FileuUploadModule {}
