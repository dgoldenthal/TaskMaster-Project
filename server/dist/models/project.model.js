"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
    static initModel(sequelize) {
        return Project.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Untitled Project',
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            start_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            due_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            ownerId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
        }, {
            sequelize,
            modelName: 'Project',
            tableName: 'Projects',
            timestamps: true,
        });
    }
    static associate(models) {
        Project.belongsTo(models.User, {
            foreignKey: 'ownerId',
            as: 'owner',
        });
    }
}
exports.default = Project;
//# sourceMappingURL=project.model.js.map