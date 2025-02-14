import {Router, Request, Response} from 'express';
import {createUserTask, getAllTasks, updateUserTask} from "../db/db";
import {Task} from "../db/types";

let tasks: Task[] = []
const taskRouter = Router();

// Get all tasks
taskRouter.get('/', async (req: Request, res: Response) => {
    try {
        const tasks: Task[] | undefined = await getAllTasks();

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({error: 'Tasks not found'});
        }

        return res.status(200).json(tasks);

    } catch (error) {
        console.error('Error retrieving tasks', error);
        return res.status(500).json({error: 'Error getting tasks'});
    }
});

// Create a task (insert in db)
taskRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    const {title} = req.body;
    console.log(title);

    if (!title) {
        return res.status(400).json({error: 'Title is required'});
    }

    try {
        const newTask = await createUserTask(title);
        return res.status(201).json({message: 'Task was created', task: newTask});
    } catch (error) {
        console.error('Error creating task', error);
        return res.status(500).json({error: 'Error creating task'});
    }
});

taskRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
    const payload: Partial<Pick<Task, 'checked' | 'title' | 'dueDate'>> = req.body;
    const taskId = Number(id)
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const updatedTask = await updateUserTask(taskId, payload)
    if (!updatedTask) {
        return res.status(404).json({error: 'Task not found'});
    }

    return res.json({message: 'Task was updated', task: id});
})
//
// taskRouter.delete('/:id', (req: Request, res: Response) => {
//     const {id} = req.params;
//     const taskIndex = tasks.findIndex((task) => task.id === id);
//     if (taskIndex === -1) {
//         return res.status(404).json({error: 'Task not found'});
//     }
//     tasks.splice(taskIndex, 1);
//     res.status(204).send();
// })

export default taskRouter;