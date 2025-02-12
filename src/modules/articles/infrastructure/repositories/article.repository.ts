import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArticleDto } from '@ns/modules/articles/applications/dtos';
import { Article } from '@ns/modules/articles/domain/entities';
import { ArticleRepository } from '@ns/modules/articles/domain/repository-adapters';

@Injectable()
export default class ArticleRepositoryImpl implements ArticleRepository {
  constructor(
    @InjectRepository(Article)
    private readonly repo: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = await this.repo.create(createArticleDto);

    return this.repo.save(article);
  }

  async findAll(limit: number, page: number): Promise<Article[]> {
    return this.repo.find({
      take: limit,
      skip: (page - 1) * limit,
      order: { publishedAt: 'DESC' },
    });
  }
}
