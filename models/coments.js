module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("commentBerita", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    // created: {
    //     type: Sequelize.DATE
    // },
  });
  return Comment;
};
