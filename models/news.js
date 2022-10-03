module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("newsBerita", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        title: {
			type: Sequelize.STRING
		},
		image: {
			type: Sequelize.STRING
		},
		berita: {
			type: Sequelize.STRING
		}		
        
        // created: {
        //     type: Sequelize.DATE
        // },
    })
    return News
}