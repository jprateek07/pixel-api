module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define("Subscription", {
        serviceID: {
        type: Sequelize.INTEGER
      },
      serviceName: {
        type: Sequelize.STRING
      },
      serviceLink: {
        type: Sequelize.STRING
      },
      monthlyFee: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
    Subscription.associate = (models) => {
      Subscription.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    };

    return Subscription;
  };
  