import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

import {
  CreateArticleUseCase,
  GetArticlesUseCase,
} from '@ns/modules/articles/applications/usecases';
import { ScraperService } from '@ns/modules/articles/infrastructure/scrapping';

import { ArticleDto } from '../../applications/dtos';

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
  async scrapeAndSave(): Promise<{ status: string }> {
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
  async getArticles(@Query('limit') limit = 10, @Query('page') page = 1): Promise<ArticleDto[]> {
    return this.getArticlesUC.execute(limit, page);
  }
}
