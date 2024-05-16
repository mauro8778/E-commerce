import { Module } from '@nestjs/common';
import { FileuUploadService } from './file-upload.service';
import { FileuUploadController } from './file-upload.controller';

@Module({
  providers: [FileuUploadService],
  controllers: [FileuUploadController,fileupdateRepository],
  ]
})
export class FileuUploadModule {}
