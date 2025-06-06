const { DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require('../config/database');
const Event = sequelize.define('Event', {
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
    description: {
        type: DataTypes.STRING,
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

module.exports = Event;