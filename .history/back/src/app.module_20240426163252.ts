import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { usersModule } from './Users/user.module';
import { productModule } from './Products/product.module';
import { authModule } from './Auth/auth.module';
import { loginGlobal } from './middleware/loginGlobal';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
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
        host: configServices.get('DATABASE_HOST'),
        port: configServices.get('DATABASE_PORT'),
        username: configServices.get('DATABASE_USER'),
        password: configServices.get('DATABASE_PASSWORD'),
        database: configServices.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    usersModule,
    productModule,
    authModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loginGlobal).forRoutes('');
  }
}
