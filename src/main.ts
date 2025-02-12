import * as crypto from 'crypto';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = crypto.webcrypto as unknown as Crypto;
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('News Scraping API') // API title
    .setDescription('API for scraping, storing, and retrieving news articles') // API description
    .setVersion('1.0') // API version
    .addBearerAuth() // Add JWT bearer token (if needed)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI available at /api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
