import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'news_user',
  password: 'password',
  database: 'news',
  entities: ['dist/**/*.entity.js'],  // Assurez-vous que les entités sont bien compilées
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
});
