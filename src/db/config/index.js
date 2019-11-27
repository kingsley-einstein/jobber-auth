import env from '../../env';

const { db } = env;

export default {
  development: {
    username: db.development.username,
    password: db.development.password,
    dialect: 'postgres',
    host: db.development.host,
    database: db.development.database,
    port: db.development.port,
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  test: {
    username: db.test.username,
    password: db.test.password,
    dialect: 'postgres',
    host: db.test.host,
    database: db.test.database,
    port: db.test.port,
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  },
  production: {
    username: db.production.username,
    password: db.production.password,
    dialect: 'postgres',
    host: db.production.host,
    database: db.production.database,
    port: db.production.port,
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  }
};
