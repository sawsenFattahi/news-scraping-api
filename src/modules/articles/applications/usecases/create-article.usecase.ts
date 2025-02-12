import { Inject, Injectable } from '@nestjs/common';

import { CreateArticleDto } from '@ns/modules/articles/applications/dtos';

import {
  ARTICLE_REPOSITORY_TOKEN,
  ArticleRepository,
} from '@ns/modules/articles/domain/repository-adapters';

@Injectable()
export default class CreateArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY_TOKEN)
    private readonly articleRepo: ArticleRepository,
  ) {}

  async execute(createArticleDto: CreateArticleDto) {
    return this.articleRepo.create(createArticleDto);
  }
}
