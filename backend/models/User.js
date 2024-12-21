const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    permalink: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false, 
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false, 
    },
}, {
    tableName: 'User', 
    timestamps: true, 
});

module.exports = User;
