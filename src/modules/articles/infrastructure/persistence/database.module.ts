import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from '@ns/modules/articles/domain/entities';

@Module({
  imports: [
    ConfigModule, // Import de ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Assurez-vous que ConfigModule est importé
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT') || 3307,
        username: configService.get<string>('DB_USER') || 'root',
        password: configService.get<string>('DB_PASS') || 'password',
        database: configService.get<string>('DB_NAME') || 'news',
        entities: [Article],
        synchronize: true,
      }),
    }),
  ],
})
export default class DatabaseModule {}
