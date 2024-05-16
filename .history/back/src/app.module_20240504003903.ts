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
import { ProductEntity } from './Products/product.entity';
import { CategoryEntity } from './category/category.entity';
import { OrderModule } from './order/order.module';
import { OrderDetailsEntity } from './order/orderDetail.entity';
import { OrderEntity } from './order/order.entity';
import { UserEntity } from './Users/user.entity';
import { FileuUploadModule } from './fileupload/file-upload.module';
import typeormConfig from './config/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
isGlobal: true,
load:[typeormConfig]  
 }),
    TypeOrmModule.forFeature([ProductEntity,CategoryEntity,OrderDetailsEntity,OrderEntity,UserEntity]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServices: ConfigService) => 
        configServices.get('typeorm'),
      
    }),
    CategoryModule,
    usersModule,
    productModule,
    authModule,
    OrderModule,
    FileuUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
      
    consumer.apply(loginGlobal).forRoutes('');
  }

  }

