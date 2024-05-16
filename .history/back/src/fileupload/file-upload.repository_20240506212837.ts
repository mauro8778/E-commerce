import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import ToStream = require ('buffer-to-stream');

@Injectable()

export class FileupdateRepository{
    async uploadImage(
        file: Express.Multer.File
    ):Promise<UploadApiResponse>{

        return new Promise((resolve,reject)=>{

            if(!file){
                reject(new NotFoundException('no se encontro el archivo'));
            }
            
            const upload=v2.uploader.upload_stream(
                
            
            {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET,
            resourse_type:'auto',
            },
            (error,result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            }
        );
            ToStream(file.buffer).pipe(upload);
        })
    }
}