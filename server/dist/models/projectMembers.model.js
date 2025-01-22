"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ProjectMember extends sequelize_1.Model {
    static associate(models) {
        ProjectMember.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        ProjectMember.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    }
    static initModel(sequelize) {
        return ProjectMember.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            projectId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            role: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'ProjectMember',
            tableName: 'ProjectMembers',
            timestamps: true,
        });
    }
}
exports.default = ProjectMember;
//# sourceMappingURL=projectMembers.model.js.map