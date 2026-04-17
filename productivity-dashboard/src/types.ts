// The possible columns in the task board.
export type ColumnId = 'todo' | 'inProgress' | 'done'

// Describes a lane on the board (like "To Do" or "Done").
export interface ColumnDefinition {
  // Internal identifier used in code.
  id: ColumnId
  // Human-friendly label shown in the UI.
  title: string
}

// A single task item shown in one of the columns.
export interface Task {
  // Unique id used as a React key and for updates.
  id: string
  // Task text visible in the card.
  title: string
  // Which lane this task currently belongs to.
  column: ColumnId
  // Unix timestamp used for ordering and future date features.
  createdAt: number
}

// Convenience shape: a column definition with the tasks that belong to it.
export interface TaskColumn extends ColumnDefinition {
  // All tasks assigned to this column.
  tasks: Task[]
}
