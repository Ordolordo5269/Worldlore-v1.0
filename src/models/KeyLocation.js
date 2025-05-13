const { DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require('../config/database');
const KeyLocation = sequelize.define('KeyLocation', {
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }, 
    type: {
        type: DataTypes.ENUM('city', 'base', 'incident', 'headquarters', 'refugee'),
        allowNull: false,
    },
    conflictId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Conflict',
            key: 'id',
        },
    },
});
module.exports = KeyLocation;