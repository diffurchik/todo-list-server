import { PrismaClient } from '@prisma/client';
import Tasks from "../routes/tasks";
import {Task} from "./types";

const prisma = new PrismaClient();

export async function createUserTask(title: string, description?: string, priority: number = 3) {
    console.log('task will be created');
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

export async function updateUserTask(input: Task) {
    const { id, checked, priority, description, dueDate } = input;

    const updateData: Record<string, unknown> = {};
    if (checked !== undefined) updateData.checked = checked;
    if (priority !== undefined) updateData.priority = priority;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = dueDate;

    try {
        const updatedTask = await prisma.userTask.update({
            where: { id },
            data: updateData,
        });
        console.log('Task updated:', updatedTask);
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}
