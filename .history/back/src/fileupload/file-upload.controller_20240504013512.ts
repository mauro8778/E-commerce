import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileuUploadService } from './file-upload.service';

@Controller('files')
export class FileuUploadController {
constructor(private readonly fileuploadService: FileuUploadService){}

@Post('uploadImage/:id')
@UseInterceptors(FileInterceptor('file'))
async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
        new ParseFilePipe({

            validators: [
            new MaxFileSizeValidator({
                maxSize:200000,
                message:'El archivo es demasiado grande'
            }),
            new FileTypeValidator({
                fileType:/(jpg|png|jpeg|svg|webp|gif)/
            }),
            
            ]
            
        })
    ) file: Express.Multer.File
){

    return this.fileuploadService.uploadImage(file,productId);
}

}
