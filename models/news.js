module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("newsBerita", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    berita: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // created: {
    //     type: Sequelize.DATE
    // },
  });
  return News;
};
