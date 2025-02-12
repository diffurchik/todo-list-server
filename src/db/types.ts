export type Task = {
    id: number;
    title: string;
    checked?: boolean;
    priority?: number;
    description?: string;
    dueDate?: Date;
}