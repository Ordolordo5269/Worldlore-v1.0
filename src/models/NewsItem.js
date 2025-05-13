const { DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require('../config/database');
const NewsItem = sequelize.define('NewsItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sourceId: {
        type: DataTypes.INTEGER,
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

module.exports = NewsItem;