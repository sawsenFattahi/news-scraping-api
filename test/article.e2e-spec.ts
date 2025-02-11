import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Articles API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should scrape and save articles', async () => {
    const res = await request(app.getHttpServer()).post('/articles/scrape').expect(201);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return paginated articles', async () => {
    const res = await request(app.getHttpServer()).get('/articles?limit=5&page=1').expect(200);
    expect(res.body.length).toBeLessThanOrEqual(5);
  });

  afterAll(async () => {
    await app.close();
  });
});
