import { Injectable, NotFoundException } from '@nestjs/common';
import { FileupdateRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../Products/product.entity';

@Injectable()
export class FileuUploadService {

    constructor(private readonly fileuploadrepository:FileupdateRepository,
        @InjectRepository(ProductEntity)
        private readonly productrepository:Repository<ProductEntity>
        
        )
    {}
        async uploadImage(producID:string, file:Express.Multer.File){
            const product= await this.productrepository.findOneBy({id:producID})

            if(!product){
                throw new NotFoundException(`no se encontro el producto con id ${producID}`)
            }

            const response= await this.fileuploadrepository.uploadImage(file);

            const updateImage= await this.productrepository.update(producID,
                {imgUrl:response.secure_url,})

             const foundProduct= await this.productrepository.findOneBy({id:producID});
             
             return foundProduct

        }
    }

