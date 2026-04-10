import './App.css'

import { useState } from 'react'

import type { ColumnId, Task } from './types'

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

function App() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Set up Vite project', column: 'done', createdAt: Date.now() },
    { id: '2', title: 'Create TypeScript types', column: 'inProgress', createdAt: Date.now() },
    { id: '3', title: 'Build Kanban board', column: 'todo', createdAt: Date.now() },
  ])

  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (!newTask.trim()) return

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      column: 'todo',
      createdAt: Date.now(),
    }

    setTasks(prev => [...prev, task])
    setNewTask('')
  }

  const moveTask = (id: string, column: ColumnId) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, column } : t)))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">My Dashboard</h1>
        <span className="app-date">{today}</span>
      </header>

      <div className="dashboard-grid">
        {/* Kanban Board */}
        <div className="widget widget-kanban">
          <div className="widget-title">Task Board</div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
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
              onClick={addTask}
              style={{
                background: 'var(--accent)',
                color: '#000',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                fontWeight: 500,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Add
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {COLUMNS.map(col => (
              <div
                key={col.id}
                style={{
                  background: 'var(--surface2)',
                  borderRadius: 12,
                  padding: 12,
                  minHeight: 120,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--muted)',
                    marginBottom: 10,
                  }}
                >
                  {col.title} ({tasks.filter(t => t.column === col.id).length})
                </div>

                {tasks
                  .filter(t => t.column === col.id)
                  .map(task => (
                    <div
                      key={task.id}
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        padding: '8px 10px',
                        marginBottom: 8,
                        fontSize: 13,
                      }}
                    >
                      <div style={{ marginBottom: 6 }}>{task.title}</div>

                      <div style={{ display: 'flex', gap: 4 }}>
                        {COLUMNS.filter(c => c.id !== col.id).map(c => (
                          <button
                            key={c.id}
                            onClick={() => moveTask(task.id, c.id)}
                            style={{
                              fontSize: 10,
                              padding: '2px 6px',
                              borderRadius: 4,
                              background: 'var(--surface2)',
                              border: '1px solid var(--border)',
                              color: 'var(--muted)',
                              cursor: 'pointer',
                            }}
                          >
                            → {c.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pomodoro Timer placeholder */}
        <div className="widget">
          <div className="widget-title">Focus Timer</div>
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--muted)', fontSize: 13 }}>
            🍅 Pomodoro timer coming soon
          </div>
        </div>

        {/* Quick Notes placeholder */}
        <div className="widget">
          <div className="widget-title">Quick Notes</div>
          <textarea
            placeholder="Jot something down..."
            style={{
              width: '100%',
              minHeight: 100,
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '10px 12px',
              color: 'var(--text)',
              fontSize: 13,
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
