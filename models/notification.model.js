module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.STRING
      },
      reader: {
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  
    return Notification;
  };