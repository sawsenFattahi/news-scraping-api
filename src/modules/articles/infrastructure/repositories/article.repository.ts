import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateArticle } from '@ns/modules/articles/applications/interfaces';
import { ArticleRepository } from '@ns/modules/articles/domain/repository-adapters';
import { Article } from '@ns/modules/articles/infrastructure/entities';

@Injectable()
export default class ArticleRepositoryImpl implements ArticleRepository {
  constructor(
    @InjectRepository(Article)
    private readonly repo: Repository<Article>,
  ) {}
  private readonly logger = new Logger(ArticleRepositoryImpl.name);
  async create(createArticle: ICreateArticle): Promise<Article> {
    try {
      this.logger.log('Start saving article');
      const article = await this.repo.create(createArticle);

      const savedArticle = await this.repo.save(article);
      this.logger.log(`Article saved with ID: ${savedArticle.id}`);

      return savedArticle;
    } catch (error) {
      this.logger.error(`Error saving articles: ${error.message}`);
      throw new BadRequestException(`Error checking data: ${error.message}`);
    }
  }

  async findAll(limit: number, page: number): Promise<Article[]> {
    try {
      this.logger.log('Start finding articles');

      const articles = await this.repo.find({
        take: limit,
        skip: (page - 1) * limit,
        order: { publishedAt: 'DESC' },
      });

      this.logger.log(`Found ${articles.length} articles`);

      return articles;
    } catch (error) {
      this.logger.error(`Error finding articles: ${error.message}`);
      throw new BadRequestException(`Error finding articles: ${error.message}`);
    }
  }
}
