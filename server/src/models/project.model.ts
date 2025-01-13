import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import User from './user.model'; // Import the User model to define associations

class Project extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public start_date!: Date;
  public due_date?: Date;
  public ownerId!: number;

  // Associations
  public static associations: {
    owner: Association<Project, User>;
  };

  // Initialize the model
  static initModel(sequelize: Sequelize) {
    return Project.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Untitled Project',
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        due_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users', // Reference the Users table
            key: 'id',
          },
          onDelete: 'CASCADE', // Ensure cascading deletes
        },
      },
      {
        sequelize,
        modelName: 'Project',
        tableName: 'Projects',
        timestamps: true, // Enable createdAt and updatedAt
      }
    );
  }

  // Define associations
  static associate(models: { User: typeof User }) {
    Project.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner',
    });
  }
}

export default Project;