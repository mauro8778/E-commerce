import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import ToStream = require ('buffer-to-stream');

@Injectable()

export class FileupdateRepository{
    async uploadImage(
        file: Express.Multer.File
    ):Promise<UploadApiResponse>{

        return new Promise((resolve,reject)=>{
            const upload=v2.uploader.upload_stream(
                
            
            {resourse_type:'auto'},
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