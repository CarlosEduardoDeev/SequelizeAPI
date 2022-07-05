const Sequelize = require('sequelize')
const database = require('../DB/Db')

const Extintor = database.define('extintor',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
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

module.exports = Extintor;