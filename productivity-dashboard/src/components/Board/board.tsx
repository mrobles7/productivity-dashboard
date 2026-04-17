import type { ColumnId, TaskColumn } from '../../types'

// Props define everything this component needs to render.
// Notice there is no internal state here: this keeps it "dumb" and reusable.
interface BoardProps {
  // Pre-grouped columns with their tasks.
  columns: TaskColumn[]
  // Controlled input value for the task text box.
  newTaskTitle: string
  // Called when the input value changes.
  onNewTaskTitleChange: (value: string) => void
  // Called to create a new task.
  onTaskCreate: () => void
  // Called when a task should move to another column.
  onTaskMove: (taskId: string, column: ColumnId) => void
}

function Board({
  columns,
  newTaskTitle,
  onNewTaskTitleChange,
  onTaskCreate,
  onTaskMove,
}: BoardProps) {
  return (
    <>
      {/* Input row: receives value + callbacks from App (controlled component pattern). */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input
          value={newTaskTitle}
          // Pushes the latest input value back to parent state.
          onChange={event => onNewTaskTitleChange(event.target.value)}
          // Enter key triggers the same create action as the Add button.
          onKeyDown={event => event.key === 'Enter' && onTaskCreate()}
          placeholder="Add a task..."
          style={{
            flex: 1,
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 12px',
            color: 'var(--text)',
            fontSize: 14,
            outline: 'none',
          }}
        />

        <button
          onClick={onTaskCreate}
          style={{
            background: 'var(--accent)',
            color: '#101010',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Add
        </button>
      </div>

      {/* Render one lane per column and one card per task. */}
      <div className="board-columns">
        {columns.map(column => (
          <div key={column.id} className="board-column">
            <div className="board-column-title">
              {column.title} ({column.tasks.length})
            </div>

            {column.tasks.map(task => (
              <div key={task.id} className="board-task-card">
                <div style={{ marginBottom: 6 }}>{task.title}</div>

                {/* Show move buttons for every lane except the current lane. */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {columns
                    .filter(moveTarget => moveTarget.id !== column.id)
                    .map(moveTarget => (
                      <button
                        key={moveTarget.id}
                        onClick={() => onTaskMove(task.id, moveTarget.id)}
                        className="board-task-move"
                      >
                        {moveTarget.title}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Board