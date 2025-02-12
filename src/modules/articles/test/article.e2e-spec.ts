import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import {
  CreateArticleUseCase,
  GetArticlesUseCase,
} from '@ns/modules/articles/applications/usecases';
import { ScraperService } from '@ns/modules/articles/infrastructure/scrapping';
import { ArticlesController } from '@ns/modules/articles/presentation/controllers';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';

describe('ArticlesController (e2e)', () => {
  let app: INestApplication;
  let createArticleUC: CreateArticleUseCase;
  let getArticlesUC: GetArticlesUseCase;
  let scraperService: ScraperService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: CreateArticleUseCase,
          useValue: { execute: jest.fn() }, // Mock implementation
        },
        {
          provide: GetArticlesUseCase,
          useValue: { execute: jest.fn() }, // Mock implementation
        },
        {
          provide: ScraperService,
          useValue: { scrape: jest.fn() }, // Mock implementation
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    createArticleUC = moduleFixture.get<CreateArticleUseCase>(CreateArticleUseCase);
    getArticlesUC = moduleFixture.get<GetArticlesUseCase>(GetArticlesUseCase);
    scraperService = moduleFixture.get<ScraperService>(ScraperService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /articles/scrape?url= should scrape and save articles', async () => {
    const mockArticles = [
      { title: 'Article 1', content: 'Content 1' },
      { title: 'Article 2', content: 'Content 2' },
    ];

    (scraperService.scrape as jest.Mock).mockResolvedValue(mockArticles);
    (createArticleUC.execute as jest.Mock).mockResolvedValueOnce(mockArticles[0]);
    (createArticleUC.execute as jest.Mock).mockResolvedValueOnce(mockArticles[1]);

    const response = await request(app.getHttpServer())
      .post('/articles/scrape')
      .query({ url: 'https://www.bbc.com/news' })
      .expect(201);

    expect(scraperService.scrape).toHaveBeenCalledTimes(1);
    expect(createArticleUC.execute).toHaveBeenCalledTimes(2);
    expect(response.body).toEqual({ status: 'Scraping started in the background' });
  });

  it('GET /articles should return a list of articles', async () => {
    const mockResponse = {
      articles: [
        { id: 1, title: 'Test Article 1' },
        { id: 2, title: 'Test Article 2' },
      ],
      total: 2,
    };

    (getArticlesUC.execute as jest.Mock).mockResolvedValue(mockResponse);

    const response = await request(app.getHttpServer()).get('/articles?limit=5&page=1').expect(200);

    expect(getArticlesUC.execute).toHaveBeenCalledWith('5', '1');
    expect(response.body).toEqual(mockResponse);
  });
});
