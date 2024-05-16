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
import { OrdersModule } from './orders/orders.module';
import { ProductRepository } from './Products/product.repository';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor (private readonly productorepository: ProductRepository){}
  configure(consumer: MiddlewareConsumer) {
    
      
    consumer.apply(loginGlobal).forRoutes('');
  }

  
  async onModuleInit() {
  await this.productorepository.getProductBD()
}
  }

