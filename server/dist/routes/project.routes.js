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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.auth);
router.post('/', project_controller_1.createProject);
router.get('/', project_controller_1.getProjects);
router.get('/:id', project_controller_1.getProjectById);
router.put('/:id', project_controller_1.updateProject);
router.delete('/:id', project_controller_1.deleteProject);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('POST /api/projects - Creating a new project');
        yield (0, project_controller_1.createProject)(req, res);
    }
    catch (error) {
        console.error('Error in POST /api/projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('GET /api/projects - Fetching all projects');
        yield (0, project_controller_1.getProjects)(req, res);
    }
    catch (error) {
        console.error('Error in GET /api/projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`GET /api/projects/${req.params.id} - Fetching project by ID`);
        yield (0, project_controller_1.getProjectById)(req, res);
    }
    catch (error) {
        console.error(`Error in GET /api/projects/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`PUT /api/projects/${req.params.id} - Updating project by ID`);
        yield (0, project_controller_1.updateProject)(req, res);
    }
    catch (error) {
        console.error(`Error in PUT /api/projects/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`DELETE /api/projects/${req.params.id} - Deleting project by ID`);
        yield (0, project_controller_1.deleteProject)(req, res);
    }
    catch (error) {
        console.error(`Error in DELETE /api/projects/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.default = router;
//# sourceMappingURL=project.routes.js.map