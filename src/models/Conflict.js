const { DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require('../config/database');
const Conflict = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Motives: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Timeline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    involvedActors: {
    }
});

module.exports = Conflict;