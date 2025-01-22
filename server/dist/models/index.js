"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMember = exports.Task = exports.User = exports.Project = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const project_model_1 = __importDefault(require("./project.model"));
exports.Project = project_model_1.default;
const task_model_1 = __importDefault(require("./task.model"));
exports.Task = task_model_1.default;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const projectMembers_model_1 = __importDefault(require("./projectMembers.model"));
exports.ProjectMember = projectMembers_model_1.default;
const db = {};
const models = [project_model_1.default, task_model_1.default, user_model_1.default, projectMembers_model_1.default];
models.forEach((model) => {
    model.initModel(database_1.sequelize);
    db[model.name] = model;
});
Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});
Object.assign(db, { sequelize: database_1.sequelize, Sequelize: sequelize_1.Sequelize });
exports.default = db;
//# sourceMappingURL=index.js.map