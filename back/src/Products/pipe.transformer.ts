import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PriceTransformer implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        
        if(typeof value === 'string' && !isNaN(parseFloat(value))){

            return parseFloat(value);
        }

        return value;
    }


}