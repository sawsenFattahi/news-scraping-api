import type { Article } from '@ns/modules/articles/domain/entities';

export const ARTICLE_REPOSITORY_TOKEN = Symbol('ArticleRepository');

export default interface ArticleRepository {
  create(data: Partial<Article>): Promise<Article>;
  findAll(limit: number, page: number): Promise<Article[]>; // Assurez-vous que la méthode est bien déclarée
}
