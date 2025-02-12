import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as redisStore from 'cache-manager-ioredis';

import { AppController } from '@ns/app.controller';
import { AppService } from '@ns/app.service';
import { ArticlesModule } from '@ns/modules/articles/articles.module';
import { DatabaseModule } from '@ns/modules/articles/infrastructure/persistence';
import { CacheModule } from '@nestjs/cache-manager';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development.local'}` });

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'my-redis',
      port: 6379,
      ttl: 800, // Cache Time-to-Live in seconds
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [() => dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })],
      isGlobal: true,
      validationSchema: Joi.object({ // Validate the environment variables
        NODE_ENV: Joi.string()
          .valid('development.local', 'production', 'test')
          .default('development'),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
