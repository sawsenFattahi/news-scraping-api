import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { logAsync } from 'perf-async-logger';

import { ArticleDto } from '@ns/modules/articles/applications/dtos';
import {
  CreateArticleUseCase,
  GetArticlesUseCase,
} from '@ns/modules/articles/applications/usecases';
import { Article } from '@ns/modules/articles/infrastructure/entities';
import { ScraperService } from '@ns/modules/articles/infrastructure/scrapping';

@Controller('articles')
export default class ArticlesController {
  constructor(
    private readonly createArticleUC: CreateArticleUseCase,
    private readonly getArticlesUC: GetArticlesUseCase,
    private readonly scraperService: ScraperService,
  ) {}

  @Post('/scrape')
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @logAsync
  async scrapeAndSave() {
    setImmediate(async () => {
      const articles = await this.scraperService.scrape();
      await Promise.all(articles.map((article) => this.createArticleUC.execute(article)));
    });

    return { status: 'Scraping started in the background' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit number of articles' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
  @ApiResponse({ status: 200, description: 'List of articles.', type: [ArticleDto] })
  @logAsync
  async getArticles(
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ): Promise<Partial<ArticleDto[]>> {
    return this.getArticlesUC.execute(limit, page);
  }
}
