export type ColumnId = 'todo' | 'inProgress' | 'done'

export interface Task {
  id: string
  title: string
  column: ColumnId
  createdAt: number
}
