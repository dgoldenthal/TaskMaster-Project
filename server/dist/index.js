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
const express_1 = __importDefault(require("express"));
require("./types");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const slack_routes_1 = __importDefault(require("./routes/slack.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const models_1 = __importDefault(require("./models"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/integrations/slack', slack_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/projects', project_routes_1.default);
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        if (process.env.NODE_ENV === 'development') {
            yield models_1.default.sequelize.sync();
            console.log('All models were synchronized successfully.');
        }
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
startServer();
//# sourceMappingURL=index.js.map