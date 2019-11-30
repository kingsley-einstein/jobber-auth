const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  require('dotenv').config();
}

export default {
  ports: {
    development: process.env.PORT,
    production: process.env.PORT,
    test: process.env.TEST_PORT
  },
  db: {
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    test: {
      username: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      port: process.env.TEST_DB_PORT
    }
  },
  cloud: {
    endpoint: process.env.CLOUD_ENDPOINT,
    name: process.env.CLOUD_NAME,
    profiles: process.env.CLOUD_PROFILES
  },
  jwtSecret: process.env.JWT_SECRET,
  thisHost: process.env.MAIN_HOST
};
