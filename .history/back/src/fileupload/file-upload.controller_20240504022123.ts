import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileuUploadService } from './file-upload.service';

@Controller('files')
export class FileuUploadController {
constructor(private readonly fileuploadService: FileuUploadService){}

@Post('uploadimage/:id')
async uploadImage(
    @Param('id') file: Express.Multer.File
){

    return this.fileuploadService.uploadImage(file);
}

}
