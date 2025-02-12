import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import { ICreateArticle } from '@ns/modules/articles/applications/interfaces';
import { ArticleRepository } from '@ns/modules/articles/domain/repository-adapters';
import { Article } from '@ns/modules/articles/infrastructure/entities';

@Injectable()
export default class ArticleRepositoryImpl implements ArticleRepository {
  constructor(
    @InjectRepository(Article)
    private readonly repo: Repository<Article>,
    @Inject('CACHE_MANAGER') private cacheManager: Cache
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
      // ✅ Test Redis
      await this.cacheManager.set('test-key', 'Hello Redis', 300);
      const value = await this.cacheManager.get('test-key');
      console.log(value);  // ✅ Devrait afficher "Hello Redis"
  
      this.logger.log('Start finding articles');
      const cacheKey = `articles:${page}:${limit}`;
      this.logger.log(`Cache key: ${cacheKey}`);
  
      // ✅ Récupérer la valeur brute
      const cached = await this.cacheManager.get<string>(cacheKey);
      this.logger.log(`Cached value: ${cached}`);
  
      // ✅ Désérialiser la chaîne JSON
      if (cached) {
        const articles = JSON.parse(cached); // Convertir la chaîne JSON en tableau d'articles
        this.logger.log('Found cached articles');
        return articles;
      }
  
      // ✅ Requête SQL si le cache est vide
      const articles = await this.repo.find({
        take: limit,
        skip: (page - 1) * limit,
        order: { publishedAt: 'DESC' },
      });
  
      this.logger.log(`Found ${articles.length} articles`);
  
      // ✅ Sérialisation lors de la mise en cache
      await this.cacheManager.set(cacheKey, JSON.stringify(articles), 800);
      this.logger.log('Articles saved in cache', cacheKey);
  
      return articles;
    } catch (error) {
      this.logger.error(`Error finding articles: ${error.message}`);
      throw new BadRequestException(`Error finding articles: ${error.message}`);
    }
  }
  
}
