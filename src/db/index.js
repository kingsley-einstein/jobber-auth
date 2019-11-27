import { Sequelize, DataTypes } from 'sequelize';
import models from './models';
import config from './config';

const sequelize = new Sequelize(
  config[process.env.NODE_ENV]
);

const { Auth, InvalidToken } = models;
const db = {
  sequelize,
  models: {
    User: Auth(sequelize, DataTypes),
    Token: InvalidToken(sequelize, DataTypes)
  }
};

export default db;
