// src/models/index.ts

import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import Project from './project.model';
import Task from './task.model';
import User from './user.model';
import ProjectMember from './projectMembers.model';

// Object to hold initialized models
const db: { [key: string]: any } = {};

// Initialize models
const models = [Project, Task, User, ProjectMember];
models.forEach((model) => {
  model.initModel(sequelize);
  db[model.name] = model;
});

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

// Add sequelize and Sequelize to the db object
// For compatibility with other modules and reuse
Object.assign(db, { sequelize, Sequelize });

export { Project, User, Task, ProjectMember }; // Export individual models if needed
export default db;