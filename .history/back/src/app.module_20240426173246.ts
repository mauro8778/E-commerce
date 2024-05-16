import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { usersModule } from './Users/user.module';
import { productModule } from './Products/product.module';
import { authModule } from './Auth/auth.module';
import { loginGlobal } from './middleware/loginGlobal';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        dropSchema: true,
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
