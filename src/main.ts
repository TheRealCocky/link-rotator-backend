import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validação automática dos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não existem no DTO
      forbidNonWhitelisted: true, // lança erro se receber campos extras
      transform: true, // transforma payloads nos tipos dos DTOs
    }),
  );

  await app.listen(3000);
}
bootstrap();

