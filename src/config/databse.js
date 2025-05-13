const { Sequelize } = require('sequelize');
//const oracledb = require('oracledb');

const sequelize = new Sequelize('worldloredatabase', 'root', 'contraseña', {
    host: 'localhost',
    dialect: 'oracle', // Cambia 'postgres' a 'mysql' o 'oracle'
    port: 1521, // Default port for Oracle XE is 1521
    dialectOptions: {
        connectString: 'localhost:1521/ORCLCDB.localdomain' // Update Oracle connection string
    } 
});

module.exports = sequelize;