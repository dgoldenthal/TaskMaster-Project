"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const project_model_1 = __importDefault(require("../models/project.model"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, ownerId } = req.body;
        if (!name || !ownerId) {
            return res.status(400).json({ message: 'Name and ownerId are required' });
        }
        const newProject = yield project_model_1.default.create({ name, description, ownerId });
        return res.status(201).json({ message: 'Project created', project: newProject });
    }
    catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Failed to create project' });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_model_1.default.findAll();
        return res.status(200).json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Failed to fetch projects' });
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const project = yield project_model_1.default.findOne({ where: { id, ownerId } });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({ message: 'Failed to fetch project', error: error.message });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { title, description, startDate, dueDate } = req.body;
        const project = yield project_model_1.default.findOne({ where: { id, ownerId } });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        yield project.update({ title, description, startDate, dueDate });
        return res.status(200).json({ message: 'Project updated successfully', project });
    }
    catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const project = yield project_model_1.default.findOne({ where: { id, ownerId } });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        yield project.destroy();
        return res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.controller.js.map