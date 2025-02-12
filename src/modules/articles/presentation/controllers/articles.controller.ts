import { Controller, Get, Post, Query } from '@nestjs/common';

import {
  CreateArticleUseCase,
  GetArticlesUseCase,
} from '@ns/modules/articles/applications/usecases';
import { ScraperService } from '@ns/modules/articles/infrastructure/scrapping';

@Controller('articles')
export default class ArticlesController {
  constructor(
    private readonly createArticleUC: CreateArticleUseCase,
    private readonly getArticlesUC: GetArticlesUseCase,
    private readonly scraperService: ScraperService,
  ) {}

  @Post('/scrape')
  async scrapeAndSave() {
    console.log('Scraping and saving articles...');
    const articles = await this.scraperService.scrape();

    return Promise.all(articles.map((article) => this.createArticleUC.execute(article)));
  }

  @Get()
  async getArticles(@Query('limit') limit = 10, @Query('page') page = 1) {
    return this.getArticlesUC.execute(limit, page);
  }
}
