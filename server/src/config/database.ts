
// src/config/database.ts

import { Sequelize } from 'sequelize';
import config, { DBConfig } from './config'; // Import DBConfig and environment configurations

const env = process.env.NODE_ENV || 'development';
const dbConfig: DBConfig = config[env as keyof typeof config];

if (!dbConfig) {
  throw new Error(`Database configuration for environment '${env}' not found.`);
}

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging || false, // Disable logging by default unless specified
  ...(dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions }),
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

export { sequelize, Sequelize };