import * as crypto from 'crypto';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from '@ns/modules/articles/infrastructure/entities';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT') || 3307,
        username: configService.get<string>('DB_USER') || 'root',
        password: configService.get<string>('DB_PASS') || 'password',
        database: configService.get<string>('DB_NAME') || 'news',
        entities: [Article],
        synchronize: true, // Use migrations in production
        uuidExtension: crypto.randomUUID,
      }),
    }),
  ],
})
export default class DatabaseModule {}
