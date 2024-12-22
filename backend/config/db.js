const Sequelize = require('sequelize'); 
require('dotenv').config();

const sequelize = new Sequelize( 
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.EXTENSION
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the MySQL database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = sequelize; 
