import express, { Request, Response }  from "express";
const cors = require('cors') as any;
import taskRouter from "./routes/tasks";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use('/tasks', taskRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the todo application!');
})


app.get('/about', (req: Request, res: Response) => {
    res.send('About this application');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})