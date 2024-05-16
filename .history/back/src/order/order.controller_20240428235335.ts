import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    addOrder( id: string, productIds: string[] ) {
        return this.orderService.addOrder( id, productIds );
    }
}
