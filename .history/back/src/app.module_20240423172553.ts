import { Module } from '@nestjs/common';
import { usersModule } from './Users/user.module';
import { productModule } from './Products/product.module';
import { authModule } from './Auth/auth.module';

@Module({
  imports: [usersModule, productModule, authModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
