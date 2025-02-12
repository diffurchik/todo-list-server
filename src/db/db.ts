import { PrismaClient } from '@prisma/client';
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
                due_date: new Date('2025-03-15T10:00:00Z'),
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

export async function updateUserTask(id: number, payload: Partial<Pick<Task, 'checked' | 'title'>>): Promise<Task | null> {
    const task = await prisma.userTask.findUnique({ where: { id } });

    if (!task) return null;

    const updatedTask = await prisma.userTask.update({
        where: { id },
        data: payload, // `{ checked: true }` or `{ title: 'New Title' }`
    });

    return updatedTask;
}
