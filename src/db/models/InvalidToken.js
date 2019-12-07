export default (sequelize, DataTypes) => {
  const InvalidToken = sequelize.define('Token', {
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
    timestamps: true
  });

  InvalidToken.findByToken = (token) => InvalidToken.findOne({
    where: {
      token
    }
  });
  return InvalidToken;
};
