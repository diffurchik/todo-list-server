import { Router, Request, Response } from 'express';

interface Task {
    id: string
    title: string
    completed: boolean
}

let tasks: Task[] = []
const taskRouter = Router();

taskRouter.get('/', (req: Request, res: Response) => {
    res.json(tasks);
})

taskRouter.post('/', (req: Request, res: Response): Response => {
    const { title } = req.body;
    console.log(title)
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = {id: Date.now().toString(), title, completed: false};
    tasks.push(newTask);
    return res.status(201).json({ message: 'Task was created', task: { title, completed: false } });
});

taskRouter.put('/:id', (req: Request, res: Response): Response => {
    const {id} = req.params;
    const task = tasks.find((task) => task.id === id);
    if(!task){
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = !task.completed;
    return res.json({message: 'Task was updated', task: id});
})

taskRouter.delete('/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if(taskIndex === -1){
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
})

export default taskRouter;