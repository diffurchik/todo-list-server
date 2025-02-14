import {PrismaClient} from '@prisma/client';
import Tasks from "../routes/tasks";
import {Task} from "./types";

const prisma = new PrismaClient();

export async function createUserTask(title: string, description?: string, priority: number = 3) {
    try {
        const newTask = await prisma.userTask.create({
            data: {
                title,
                description,
                priority,
                due_date: new Date(),
            },
        });
        console.log('Task created:', newTask);
        return newTask;
    } catch (error) {
        console.error('Error creating task:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAllTasks() {
    try {
        return await prisma.userTask.findMany({
            where: {checked: false}
        })
    } catch (err) {
        console.error('Error getting all tasks:', err);
    }
}

export async function updateUserTask(id: number, payload: Partial<Pick<Task, 'checked' | 'title' | 'dueDate'>>): Promise<Task | null> {
    const task = await prisma.userTask.findUnique({where: {id}});

    if (!task) return null;

    if(Object.keys(payload)[0] === 'dueDate'){
        const updatedTask = await prisma.userTask.update({
            where: {id},
            data: {due_date: payload.dueDate},
        });
        return updatedTask;
    }

    const updatedTask = await prisma.userTask.update({
        where: {id},
        data: payload,
    });

    return updatedTask;
}

export async function getTodayTasks() {
    try {
        return await prisma.userTask.findMany({where: {checked: false, due_date: new Date()}});
    } catch (e) {
        console.error('Error getting tasks:', e);
    }
}

export async function getOutdatedTasks() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    try {
        return await prisma.userTask.findMany({where: {checked: false, due_date: date}});
    } catch (err) {
        console.error('Error getting tasks:', err);
    }
}
