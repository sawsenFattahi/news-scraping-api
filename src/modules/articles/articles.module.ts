import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateArticleUseCase,
  GetArticlesUseCase,
} from '@ns/modules/articles/applications/usecases';
import { ARTICLE_REPOSITORY_TOKEN } from '@ns/modules/articles/domain/repository-adapters';
import { Article } from '@ns/modules/articles/infrastructure/entities';
import { ArticleRepositoryImpl } from '@ns/modules/articles/infrastructure/repositories';
import { ScraperService } from '@ns/modules/articles/infrastructure/scrapping';
import { ArticlesController } from '@ns/modules/articles/presentation/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [
    CreateArticleUseCase,
    GetArticlesUseCase,
    ScraperService,
    {
      provide: ARTICLE_REPOSITORY_TOKEN,
      useClass: ArticleRepositoryImpl,
    },
  ],
  exports: [CreateArticleUseCase, GetArticlesUseCase, ScraperService, ARTICLE_REPOSITORY_TOKEN],
})
export class ArticlesModule {}
