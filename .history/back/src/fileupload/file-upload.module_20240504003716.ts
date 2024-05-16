import { Module } from '@nestjs/common';
import { FileuUploadService } from './fileu-upload.service';
import { FileuUploadController } from './fileu-upload.controller';

@Module({
  providers: [FileuUploadService],
  controllers: [FileuUploadController]
})
export class FileuUploadModule {}
