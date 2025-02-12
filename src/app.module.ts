import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { AppController } from '@ns/app.controller';
import { AppService } from '@ns/app.service';
import { ArticlesModule } from '@ns/modules/articles/articles.module';
import { DatabaseModule } from '@ns/modules/articles/infrastructure/persistence';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development.local'}` });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
