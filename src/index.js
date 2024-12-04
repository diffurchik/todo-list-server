"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/tasks', tasks_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the server');
});
app.get('/about', (req, res) => {
    res.send('About Me');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
