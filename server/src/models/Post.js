const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Modelo Post
 * Requerimientos:
 * 1. JSON camel-case (name, description)
 * 2. JS camel-case (name, description)
 * 3. DB (Internal): Sequelize maneja esto.
 */
const Post = sequelize.define('Post', {
    // Integers standard ID
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // "Nombre" -> Mapped to 'name' in JSON/JS
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre' // DB nombre columna
    },
    // "Descripción" -> Mapped to 'description' in JSON/JS
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'descripcion' // DB nombre columna
    }
}, {
    tableName: 'posts',
    timestamps: true, // creates createdAt, updatesAt
});

module.exports = Post;
