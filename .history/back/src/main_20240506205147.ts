import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
const swaggerConfig= new DocumentBuilder()
.setTitle('Ecommerce-M4')
.setDescription('Es una api de un ecommerce, creada con nest en la especializacion en backend')
.setVersion('1.0')
.addBearerAuth()
.build();

const document = SwaggerModule.createDocument(app,swaggerConfig);
SwaggerModule.setup('Documentation', app, document {
  swaggerOptions:
  theme:'dark'
});




  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(3000);
}
bootstrap();
