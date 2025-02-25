## Description

The News Scraping API is a RESTful application built with NestJS, designed to extract, store, and manage news articles from various online sources. This API leverages MySQL for robust data storage and Redis for efficient caching, ensuring fast retrieval and optimized performance.

The primary goal of this project is to automate the process of scraping news articles, storing them in a structured format, and providing flexible endpoints for querying the data. It supports features like pagination, sorting, and filtering, making it ideal for news aggregation platforms, content analysis tools, or data-driven applications.

Key Features:

    🌐 Web Scraping: Extracts articles from news websites with metadata like title, link, source, and publication date.
    ⚡ High Performance: Implements Redis caching to reduce database load and speed up API responses.
    🗄️ Robust Data Storage: Uses MySQL with TypeORM for relational data management and optimized queries.
    🔍 Flexible API: Supports pagination, filtering by source, date sorting, and full-text search (optional).
    📝 API Documentation: Integrated with Swagger for easy API exploration and testing.
    🐳 Containerized Deployment: Docker support for seamless development and deployment.

This API is designed with scalability in mind, ensuring that it can handle large volumes of articles efficiently while maintaining high performance.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment


```bash
$ yarn install -g mau
$ mau deploy
```
## Use Docker Compose
docker network create um-network  
docker-compose up --build

### Access the Application
The application will typically be available at http://localhost:3000. Verify the port in your docker-compose.yml

## API Documentation Explore endpoints using Open API
The Open API will typically be available at http://localhost:3000/api-docs. Verify the port in your docker-compose.yml or .env
