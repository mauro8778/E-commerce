import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileuUploadService } from './file-upload.service';

@Controller('files')
export class FileuUploadController {
constructor(private readonly fileuploadService: FileuUploadService){}

@Post('uploadimage/:id')
@UseInterceptors(FileInterceptor('file'))
async uploadImage(
    @Param('id') producID:string,
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
                new FileTypeValidator({ fileType: 'image/*' }),
            ],
        }),
    )
)
{   

    return this.fileuploadService.uploadImage(productID,file);
}

}
