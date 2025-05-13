const { DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require('../config/database');
const Party = sequelize.define('Party', {
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
    Objectives: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Strategy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Resources: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ConflictId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Conflict',
            key: 'id',
        },
    },
});

module.exports = Party;
