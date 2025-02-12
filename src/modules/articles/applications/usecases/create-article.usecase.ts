import { Inject, Injectable } from '@nestjs/common';

import { ICreateArticle } from '@ns/modules/articles/applications/interfaces';
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

  async execute(createArticle: ICreateArticle) {
    return this.articleRepo.create(createArticle);
  }
}
