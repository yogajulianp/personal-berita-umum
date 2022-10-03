module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("commentBerita", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
			type: Sequelize.STRING
		},
		comment: {
			type: Sequelize.STRING
		}
			
        
        // created: {
        //     type: Sequelize.DATE
        // },
    })
    return Comment
}