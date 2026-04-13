// The possible columns in the task board.
export type ColumnId = 'todo' | 'inProgress' | 'done'

// A single task item shown in one of the columns.
export interface Task {
  id: string
  title: string
  column: ColumnId
  // Unix timestamp used for ordering and future date features.
  createdAt: number
}
