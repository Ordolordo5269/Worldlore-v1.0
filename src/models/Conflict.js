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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    casualties: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    peopleAffected: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rootCauses: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keyActors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    affectedCountries: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    economicImpact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    intensity: {
        type: DataTypes.ENUM('Low', 'Medium', 'Severe'),
        allowNull: false,
    }
});

module.exports = Conflict;