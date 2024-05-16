import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { usersModule } from './Users/user.module';
import { productModule } from './Products/product.module';
import { authModule } from './Auth/auth.module';
import { loginGlobal } from './middleware/loginGlobal';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ProductRepository } from './Products/product.repository';
import { ProductEntity } from './Products/product.entity';
import { CategoryRepository } from './category/category.repository';
import { CategoryEntity } from './category/category.entity';
import { OrderModule } from './order/order.module';
import { OrderDetailsEntity } from './order/orderDetail.entity';
import { OrderEntity } from './order/order.entity';
import { UserEntity } from './Users/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([ProductEntity,CategoryEntity,OrderDetailsEntity,OrderEntity,UserEntity]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServices: ConfigService) => ({
        type: 'postgres',
        host: configServices.get<string>('DB_HOST'),
        port: configServices.get<number>('DB_PORT'),
        username: configServices.get<string>('DB_USER'),
        password: configServices.get<string>('DB_PASSWORD'),
        database: configServices.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        logging: true,

        synchronize: true,
        //dropSchema: true,
      }),
    }),
    CategoryModule,
    usersModule,
    productModule,
    authModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductRepository,CategoryRepository],
})
export class AppModule implements NestModule {
  constructor (
    private readonly productorepository: ProductRepository,
    private readonly categoriRepository: CategoryRepository,
  ){}

  configure(consumer: MiddlewareConsumer) {
    
      
    consumer.apply(loginGlobal).forRoutes('');
  }

  
  async onModuleInit() {
  await this.productorepository.getProductBD();
}
  }

