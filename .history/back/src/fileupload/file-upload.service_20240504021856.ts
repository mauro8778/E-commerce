import { Injectable, NotFoundException } from '@nestjs/common';
import { FileupdateRepository } from './file-upload.repository';

@Injectable()
export class FileuUploadService {

    constructor(private readonly fileuploadrepository:FileupdateRepository,
        
        )
    {}
        async uploadImage(productId:string,file:Express.Multer.File):Promise<UploadApiResponse>{

            const response= await this.fileuploadrepository.uploadImage(file)

             return response;

        }
    }

