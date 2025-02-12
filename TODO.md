#  TODO List for News Scraping API (NestJS + MySQL + Redis)

##  Completed
- [x] Setup NestJS project structure
- [x] Implement MySQL database integration with TypeORM
- [x] Add Redis caching for improved performance
- [x] Containerize the app using Docker
- [x] Add Swagger documentation for API endpoints

---

##  In Progress
- [ ] Fix MySQL connection issues on Windows (ECONNREFUSED error)
- [ ] Improve error handling in API responses
- [ ] Add environment-specific configurations for development and production
- [ ] Implement authentication using JWT
- [ ] Set up unit and integration tests with Jest

---

##  Backlog
- [ ] Add support for PostgreSQL as an alternative to MySQL
- [ ] Implement rate-limiting to prevent abuse
- [ ] Create frontend dashboard for viewing scraped articles
- [ ] Add internationalization (i18n) support
- [ ] Optimize database queries with proper indexing

---

##  Technical Debt
- [ ] Refactor `ArticleRepositoryImpl` for better separation of concerns
- [ ] Improve logging with Winston or Pino instead of `console.log`
- [ ] Add proper validation for environment variables

---

##  Performance Improvements
- [ ] Implement query caching using Redis for frequent API requests
- [ ] Optimize database indexing for faster queries
- [ ] Enable database connection pooling for improved performance

---

##  Testing
- [ ] Achieve 90%+ code coverage with Jest tests
- [ ] Write integration tests for all API endpoints
- [ ] Add end-to-end (E2E) tests using Supertest

---

##  Security Enhancements
- [ ] Add security headers using Helmet
- [ ] Sanitize inputs to prevent SQL injection and XSS attacks
- [ ] Implement role-based access control (RBAC)

---

##  Future Ideas
- [ ] Add a scheduling feature to automate scraping at regular intervals
- [ ] Integrate with external APIs for more data sources
- [ ] Deploy the app to AWS/GCP with CI/CD pipelines
