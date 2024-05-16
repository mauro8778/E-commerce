import { Injectable } from '@nestjs/common';
import { FileupdateRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/Products/product.repository';
import { Repository } from 'typeorm';
import { Product } from 'src/Products/product.interface';

@Injectable()
export class FileuUploadService {

    constructor(private readonly fileuploadrepository:FileupdateRepository,
        @InjectRepository(ProductRepository)
            private readonly productrepository: Repository<Product>
        )
    {}
        async uploadImage(file:Express.Multer.File, productID:string){
            const response= await this.fileuploadrepository.uploadImage(file);
            return response;

        }
    }

