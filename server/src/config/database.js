const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la Base de Datos (Docker)
// Se usa process.env o valores por defecto del docker-compose.yml
const sequelize = new Sequelize(
    process.env.DB_NAME || 'challenge_db',
    process.env.DB_USER || 'dev_user',
    process.env.DB_PASS || 'dev_password_123',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false, // Desactivar logs SQL para limpiar la consola
    }
);

// Función para testear conexión
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connected (Docker).');
        // Sincronizar modelos (crear tablas si no existen)
        await sequelize.sync();
        console.log('✅ Models Synced.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
