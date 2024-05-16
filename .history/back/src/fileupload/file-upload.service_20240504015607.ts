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
            private readonly productrepository: Repository<Product>
        )
    {}
        async uploadImage(file:Express.Multer.File, productID:string){

            const product = await this.productrepository.findOne({where:{id:productID}});
            console.log(product);
            if(!product){
                throw new NotFoundException(`producto con ${productID} no existe`);
            }
            const response= await this.fileuploadrepository.uploadImage(file);
            await this.productrepository.update({id:productID},{imgUrl:response.secure_url});
            
            const newProduct= await this.productrepository.findOne({where:{id:productID}});

            return newProduct;

        }
    }

