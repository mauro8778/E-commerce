import { Injectable, NotFoundException } from '@nestjs/common';
import { FileupdateRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/Products/product.repository';
import { Repository } from 'typeorm';
import { Product } from 'src/Products/product.interface';

@Injectable()
export class FileuUploadService {

    constructor(private readonly fileuploadrepository:FileupdateRepository,
        @InjectRepository(ProductRepository)
        private readonly productrepository:Repository<Product>
        
        )
    {}
        async uploadImage(producID:string, file:Express.Multer.File){
            const product= await this.productrepository.findOne({where:{id:producID}})

            if(!product){
                throw new NotFoundException(`no se encontro el producto con id ${producID}`)
            }

            const response= await this.fileuploadrepository.uploadImage(file);

            const updateImage= await this.productrepository.update({id:producID},{imgUrl:response.url})

             return updateImage;

        }
    }

