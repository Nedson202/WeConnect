require('dotenv').config();

module.exports = {
  // development: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: "weconnect-api",
  //   host: "127.0.0.1",
  //   port: "5432",
  //   dialect: "postgres"
  // },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "weconnect-api-test",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres"
  },
  secretkey: process.env.JWT_SECRET
}
