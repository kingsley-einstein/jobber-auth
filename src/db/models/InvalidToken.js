import { Model } from 'sequelize';

class InvalidToken extends Model {}

export default (sequelize, DataTypes) => {
  InvalidToken.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Token is required'
        }
      }
    }
  }, {
    timestamps: true,
    sequelize
  });

  InvalidToken.findByToken = (token) => InvalidToken.findOne({
    where: {
      token
    }
  });
  return InvalidToken;
};
