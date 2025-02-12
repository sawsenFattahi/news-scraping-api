import { Inject, Injectable } from '@nestjs/common';

import { IArticle } from '@ns/modules/articles/applications/interfaces';
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

  async execute(limit: number, page: number): Promise<IArticle[]> {
    const res = await this.articleRepo.findAll(limit, page);

    return res;
  }
}
