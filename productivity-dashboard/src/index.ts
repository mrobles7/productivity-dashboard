// Re-export shared task types so other files can import from this module if desired.
export type { ColumnId, Task } from './types'

import type { ColumnId, Task } from './types'

// A board column with its metadata and tasks.
export interface Column {
    id: ColumnId;
    title: string;
    tasks: Task[];
}

// State shape for a Pomodoro timer widget.
export interface TimeState {
    minutes: number;
    seconds: number;
    isRunning: boolean;
    mode: 'work' | 'break';
}