require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'weconnect-api',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'weconnect_test',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  },
  secretkey: process.env.JWT_SECRET,
};
