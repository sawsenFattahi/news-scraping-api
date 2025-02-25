import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { logAsync } from 'perf-async-logger';

import { Article } from '@ns/modules/articles/infrastructure/entities';

@Injectable()
export default class ScraperService {
  @logAsync
  async scrape(url: string = process.env.DEFAULT_SCRAPE_URL): Promise<Article[]> {
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html); // Load the HTML into cheerio
      const articles = [];

      $('a[data-testid="internal-link"]').each((_, element) => {
        const title = $(element).find('[data-testid="card-headline"]').text().trim();
        const link = `https://www.bbc.com${$(element).attr('href')}`; // Get the href attribute
        const source = $(element).find('[data-testid="card-metadata-tag"]').text().trim();
        const lastUpdateTime = $(element)
          .find('[data-testid="card-metadata-lastupdated"]')
          .text()
          .trim();
        let publishedAt = new Date();
        const now = new Date();

        if (lastUpdateTime && title && link) {
          const timeMatch = lastUpdateTime.match(
            /(\d+)\s*(mins?|hrs?|days?|weeks?|months?|years?)/i, // Match time units
          );

          if (timeMatch) {
            const value = parseInt(timeMatch[1]);
            const unit = timeMatch[2].toLowerCase();
            switch (true) {
              case unit.includes('min'):
                publishedAt = new Date(now.getTime() - value * 60 * 1000); // Subtract minutes
                break;
              case unit.includes('hr'):
                publishedAt = new Date(now.getTime() - value * 60 * 60 * 1000); // Subtract hours
                break;
              case unit.includes('day'):
                publishedAt = new Date(now.getTime() - value * 24 * 60 * 60 * 1000); // Subtract days
                break;
              case unit.includes('week'):
                publishedAt = new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000); // Subtract weeks
                break;
              case unit.includes('month'):
                publishedAt = new Date(now.setMonth(now.getMonth() - value)); // Subtract months
                break;
              case unit.includes('year'):
                publishedAt = new Date(now.setFullYear(now.getFullYear() - value)); // Subtract years
                break;
            }
          }
          articles.push({ title, link, source, publishedAt });
        }
      });

      return articles;
    } catch (error) {
      return []; // Return an empty array if an error occurs
    }
  }
}
