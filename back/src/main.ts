import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import hpp from 'hpp';
import { startOrderWorker } from './queues/order.queue';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Headers de Seguridad OWASP con Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Permitir Swagger UI
      crossOriginEmbedderPolicy: false,
    }),
  );

  // 2. Prevención de Contaminación de Parámetros HTTP
  app.use(hpp());

  // 3. CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 4. Validación global de DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 5. Documentación Interactiva Swagger / OpenAPI 3.0
  const swaggerConfig = new DocumentBuilder()
    .setTitle('🛒 E-Commerce Enterprise API & AI Engine')
    .setDescription(`
API RESTful de comercio electrónico de alto rendimiento diseñada con arquitectura modular, **transacciones ACID con bloqueos pesimistas para prevenir over-selling**, **colas asíncronas con BullMQ**, y **motor de IA con Google Gemini** para recomendaciones y búsqueda semántica.
    `)
    .setVersion('2.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce el token JWT obtenido en /auth/signin',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  SwaggerModule.setup('api-docs', app, document);

  // 6. Iniciar Worker de Tareas en Segundo Plano (BullMQ)
  startOrderWorker();

  const port = process.env.PORT || 3006;
  await app.listen(port);

  console.log(`====================================================`);
  console.log(`🚀 E-Commerce Enterprise API lista en puerto: ${port}`);
  console.log(`📑 Swagger API Docs: http://localhost:${port}/docs`);
  console.log(`🤖 Módulo de IA: http://localhost:${port}/ai/recommendations`);
  console.log(`====================================================`);
}

bootstrap();
