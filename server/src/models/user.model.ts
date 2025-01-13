// src/models/user.model.ts

import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import path as necessary

class User extends Model {
  static initModel(sequelize: Sequelize) {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
      }
    );
  }
}

export default User;