import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileuUploadService } from './file-upload.service';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';


@ApiTags('File Upload')
@Controller('files')
export class FileuUploadController {
constructor(private readonly fileuploadService: FileuUploadService){}

@ApiBearerAuth()
@Post('uploadimage/:id')
@UseGuards(ValidationGuardsGuard)
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a cargar',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
    file: Express.Multer.File,
)
{ 
    const files = await this.fileuploadService.uploadImage(producID,file);
    if(!file){
        throw new Error('no se subio el archivo');
    }  

    return files;
}

}
