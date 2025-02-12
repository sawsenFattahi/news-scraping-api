import type { IArticle } from '@ns/modules/articles/applications/interfaces';

export const ARTICLE_REPOSITORY_TOKEN = Symbol('ArticleRepository');

export default interface ArticleRepository {
  create(data: Partial<IArticle>): Promise<IArticle>;
  findAll(limit: number, page: number): Promise<IArticle[]>;
}
