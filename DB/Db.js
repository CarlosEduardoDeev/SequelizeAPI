require('dotenv').config()
const Sequelize = require('sequelize');

const dbuser = process.env.DB_USER
const dbpass = process.env.DB_PASS

const sequelize = new Sequelize('UAGA_SAFETY','Matrix','@keanu#uaga21', {
    dialect:'mssql',
    host:'CANADA',
    port:1433
} )




module.exports = sequelize;