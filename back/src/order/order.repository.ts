import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../Products/product.entity';
import { UserEntity } from '../Users/user.entity';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { PartialDto } from './oderdto';
import { deleteCache } from '../config/redis.config';
import { dispatchOrderProcessingJob } from '../queues/order.queue';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailsEntity)
    private readonly orderDetailsrepository: Repository<OrderDetailsEntity>,
    @InjectRepository(ProductEntity)
    private readonly productrepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Creación atómica de órdenes con prevención de condiciones de carrera (Race Conditions).
   * Utiliza transacciones ACID y bloqueos pesimistas para impedir over-selling en compras concurrentes.
   */
  async addOrder(id: string, productsInput: PartialDto[]) {
    const productIds = productsInput.map((p) => p.id);
    const uniqueIds = new Set(productIds);
    if (productIds.length !== uniqueIds.size) {
      throw new BadRequestException('La solicitud contiene productos duplicados.');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    }

    // 1. Iniciar QueryRunner para control transaccional estricto
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      let totalPrice = 0;
      const purchasedProducts: ProductEntity[] = [];

      // 2. Procesar cada producto con Bloqueo Pesimista (SELECT ... FOR UPDATE)
      for (const item of productsInput) {
        const product = await queryRunner.manager.findOne(ProductEntity, {
          where: { id: item.id },
          lock: { mode: 'pessimistic_write' }, // Impide que otro usuario lea o modifique el stock al mismo tiempo
        });

        if (!product) {
          throw new NotFoundException(`El producto con ID ${item.id} no existe.`);
        }

        if (product.stock < 1) {
          throw new BadRequestException(`El producto "${product.name}" no tiene stock suficiente.`);
        }

        // Descontar inventario
        product.stock -= 1;
        await queryRunner.manager.save(product);

        totalPrice += Number(product.price);
        purchasedProducts.push(product);
      }

      // 3. Crear cabecera de Orden
      const order = new OrderEntity();
      order.user = user;
      order.date = new Date();
      const savedOrder = await queryRunner.manager.save(order);

      // 4. Crear detalle de Orden
      const orderDetail = new OrderDetailsEntity();
      orderDetail.order = savedOrder;
      orderDetail.products = purchasedProducts;
      orderDetail.TotalPrice = totalPrice;
      await queryRunner.manager.save(orderDetail);

      // 5. Confirmar transacción (COMMIT)
      await queryRunner.commitTransaction();

      // 6. Invalidar caché del catálogo en Redis
      await deleteCache('products:*');

      // 7. Despachar trabajo asíncrono a la cola BullMQ (Sin demorar la respuesta HTTP)
      await dispatchOrderProcessingJob({
        orderId: savedOrder.id,
        userEmail: user.email,
        userName: user.name,
        totalPrice,
        products: purchasedProducts.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
        })),
      });

      // 8. Retornar la orden creada con sus relaciones
      return await this.orderRepository.findOne({
        where: { id: savedOrder.id },
        relations: [
          'user',
          'orderDetails',
          'orderDetails.products',
          'orderDetails.products.category',
        ],
        select: {
          id: true,
          date: true,
          user: {
            id: true,
            name: true,
            email: true,
          },
          orderDetails: {
            id: true,
            TotalPrice: true,
            products: {
              id: true,
              name: true,
              price: true,
              category: {
                name: true,
              },
            },
          },
        },
      });
    } catch (error) {
      // 9. Rollback total en caso de fallo (Cero pérdida de inventario)
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 10. Liberar el QueryRunner
      await queryRunner.release();
    }
  }

  async getOrder(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products', 'user'],
    });

    if (!order) {
      throw new NotFoundException(`No se encontró el pedido con id ${id}`);
    }

    return order;
  }
}
