import { Inject, Injectable } from '@nestjs/common';

import {
  ARTICLE_REPOSITORY_TOKEN,
  ArticleRepository,
} from '@ns/modules/articles/domain/repository-adapters';

@Injectable()
export default class GetArticlesUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY_TOKEN)
    private readonly articleRepo: ArticleRepository,
  ) {}

  async execute(limit: number, page: number) {
    const res = await this.articleRepo.findAll(limit, page);

    return res;
  }
}
