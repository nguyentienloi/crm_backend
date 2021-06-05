module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contacts", {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    contactName: {
      type: Sequelize.STRING
    },
    contactPhone: {
      type: Sequelize.STRING
    },
    numberProduct: {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    address: {
      type: Sequelize.STRING
    },
    statusId: {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    note: {
      type: Sequelize.STRING
    },
    khoId: {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    linkUrl: {
      type: Sequelize.STRING,
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

  return Contact;
};