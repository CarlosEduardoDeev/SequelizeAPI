const Sequelize = require('sequelize')
const database = require('../../DB/Db')

const LogsExtintor = database.define('LogsExtintor',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull:false,
        references:{model:'usuarios', key:'usuario'},
        
    },
    numeracao:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    peso:{
        type: Sequelize.STRING,
        allowNull:false
    },
    local:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = LogsExtintor;