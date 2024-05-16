import { Module } from '@nestjs/common';
import { usersModule } from './Users/user.module';
import { productModule } from './Products/product.module';
import { authModule } from './Auth/auth.module';
import { UserController } from './Users/user.controller';
import { userServices } from './Users/user.services';

@Module({
  imports: [usersModule, productModule, authModule],
  controllers: [UserController],
  providers: [userServices],
})
export class AppModule {}
