import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';

class Auth extends Model {}

export default (sequelize, DataTypes) => {
  Auth.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Enter a valid email'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        user.id = uuid();
      },
      beforeSave: (user) => {
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync(7);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    modelName: 'User'
  });
  Auth.findByEmail = (email) => Auth.findOne({
    where: {
      email
    }
  });
  return Auth;
};
