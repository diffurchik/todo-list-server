export type Task = {
    id: number;
    title: string;
    checked?: boolean;
    priority: number | null;
    description: string | null;
    dueDate?: Date;
}