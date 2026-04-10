export type { ColumnId, Task } from './types'

import type { ColumnId, Task } from './types'

export interface Column {
    id: ColumnId;
    title: string;
    tasks: Task[];
}

export interface TimeState {
    minutes: number;
    seconds: number;
    isRunning: boolean;
    mode: 'work' | 'break';
}