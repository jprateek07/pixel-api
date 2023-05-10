module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    User.associate = (models) => {
      User.hasMany(models.Subscription, {
        foreignKey: {
          name: 'user',
          allowNull: false
        },
        as: 'subscriptions',
      });
    };
    return User;
  };
  