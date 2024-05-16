import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileuUploadController {
constructor(){}

@Post('uploadImage/:id')
@UseInterceptors(FileInterceptor('file'))
async uploadImage(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File
){}

}
