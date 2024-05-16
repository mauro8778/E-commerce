import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";


@Injectable()
export class claudinaryServices{
    async CloudinaryProduct (file: Express.Multer.File):Promise<UploadApiResponse> {

        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                {resourse_type: "auto"},
                {error, result} => {
                    if(error) 
                {return reject(error);

                } else resolve(result);
                }

            )
        })

    }}
