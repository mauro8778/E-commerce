import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { JwtModule } from '@nestjs/jwt';
import { AiModule } from './ai/ai.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, OrderDetailsEntity, OrderEntity, UserEntity]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServices: ConfigService) => configServices.get('typeorm'),
    }),
    // Rate Limiting Distribuido (Protección anti-DDoS / fuerza bruta)
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120, // 120 peticiones por minuto por IP
      },
    ]),
    CategoryModule,
    usersModule,
    productModule,
    authModule,
    OrderModule,
    FileuUploadModule,
    AiModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev_secret_jwt_key_2026',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loginGlobal).forRoutes('');
  }
}
