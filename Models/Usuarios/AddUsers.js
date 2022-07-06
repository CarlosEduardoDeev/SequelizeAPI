const Sequelize = require('sequelize')
const database = require('../../DB/Db')


const Usuarios = database.define('usuario',{
    user_id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:{ 
        type: Sequelize.STRING,
        allowNull: false,
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    setor:{
        type: Sequelize.STRING,
        allowNull: false,
    }


})

module.exports = Usuarios;