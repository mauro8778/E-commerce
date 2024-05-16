import { Injectable, NotFoundException } from '@nestjs/common';
import { FileupdateRepository } from './file-upload.repository';

@Injectable()
export class FileuUploadService {

    constructor(private readonly fileuploadrepository:FileupdateRepository,
        
        )
    {}
        async uploadImage(file:Express.Multer.File){

            const response= await this.fileuploadrepository.uploadImage(file);

             return response;

        }
    }

