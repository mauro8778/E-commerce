import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { usersModule } from './Users/user.module';
import { productModule } from './Products/product.module';
import { authModule } from './Auth/auth.module';
import { loginGlobal } from './middleware/loginGlobal';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [usersModule, productModule, authModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loginGlobal).forRoutes('');
  }
}
