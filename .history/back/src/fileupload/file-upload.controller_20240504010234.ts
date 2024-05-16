import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileuUploadService } from './file-upload.service';

@Controller('files')
export class FileuUploadController {
constructor(private readonly fileuploadService: FileuUploadService){}

@Post('uploadImage/:id')
@UseInterceptors(FileInterceptor('file'))
async uploadImage(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File
){

    return this.fileuploadService.uploadImage(file,productId);
}

}
