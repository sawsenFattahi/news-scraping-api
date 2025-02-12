module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'news_user',
    password: 'password',
    database: 'news',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
  