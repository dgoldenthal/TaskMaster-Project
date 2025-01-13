// server/src/index.ts
import express from 'express';
import './types';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './routes/auth.routes';
import slackRoutes from './routes/slack.routes';
import dashboardRoutes from './routes/dashboard.routes';
import projectRoutes from './routes/project.routes';
import db from './models'; // Import models to initialize the database

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/integrations/slack', slackRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/projects', projectRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Start server function
const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models only in development mode
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync(); // Avoid using { alter: true } in production
      console.log('All models were synchronized successfully.');
    }

    // Start the Express server
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Start the server
startServer();
