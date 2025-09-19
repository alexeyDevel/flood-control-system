import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';

// Загружаем переменные окружения из .env файла
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'test-secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  app.enableCors();

  app.use(json({ limit: '10mb' }));
  app.use(
    urlencoded({ extended: true, limit: '10mb', parameterLimit: 100000 }),
  );
  await app.listen(process.env.PORT ?? 2040);
}
void bootstrap();
