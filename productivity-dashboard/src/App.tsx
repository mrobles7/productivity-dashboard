import './App.css'

import { useEffect, useState } from 'react'

import Board from './components/Board/board'
import PomodoroTimer from './components/PomodoroTimer/pomodoroTimer'
import ProgressTracker from './components/ProgressTracker/progressTracker'
import QuickNotes from './components/QuickNotes/quickNotes'

import type { ColumnDefinition, ColumnId, Task, TaskColumn } from './types'

// Static board definition used to render the three task lanes.
const COLUMNS: ColumnDefinition[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

// 25-minute default for a standard Pomodoro session.
const FOCUS_DURATION_SECONDS = 25 * 60

// Starter data for first render. Using fixed numbers avoids impure calls in render.
const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Set up Vite project', column: 'done', createdAt: 1 },
  { id: '2', title: 'Create TypeScript types', column: 'inProgress', createdAt: 2 },
  { id: '3', title: 'Build Kanban board', column: 'todo', createdAt: 3 },
]

function App() {
  // Human-readable date shown in the dashboard header.
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  // Seed tasks so the board is not empty on first load.
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  // Controlled input value for creating a new task.
  const [newTask, setNewTask] = useState('')
  // Quick notes text is also stored here so the input stays controlled.
  const [notes, setNotes] = useState('')
  // Timer state is centralized in App and passed down as props.
  const [focusSecondsRemaining, setFocusSecondsRemaining] = useState(FOCUS_DURATION_SECONDS)
  const [isFocusRunning, setIsFocusRunning] = useState(false)

  // Side-effect: tick timer once per second while running.
  // Dependency array means this effect re-evaluates when running state changes.
  useEffect(() => {
    // If timer is paused, do not create an interval.
    if (!isFocusRunning) return

    const timerId = window.setInterval(() => {
      // Functional update reads the latest value safely.
      setFocusSecondsRemaining(currentSeconds => {
        // Auto-stop and reset when countdown reaches zero.
        if (currentSeconds <= 1) {
          window.clearInterval(timerId)
          setIsFocusRunning(false)
          return FOCUS_DURATION_SECONDS
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [isFocusRunning])

  // Adds a task to the "To Do" column and clears the input.
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

  // Moves a task to a different column by id.
  const moveTask = (id: string, column: ColumnId) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, column } : t)))
  }

  // Starts when paused, pauses when running.
  const toggleFocusTimer = () => {
    setIsFocusRunning(currentValue => !currentValue)
  }

  // Stops countdown and restores full focus duration.
  const resetFocusTimer = () => {
    setIsFocusRunning(false)
    setFocusSecondsRemaining(FOCUS_DURATION_SECONDS)
  }

  // Transform flat task state into a shape that the Board UI can render directly.
  const boardColumns: TaskColumn[] = COLUMNS.map(column => ({
    ...column,
    tasks: tasks.filter(task => task.column === column.id),
  }))

  // Derived state: count completed tasks for the progress widget.
  const completedTasks = tasks.filter(task => task.column === 'done').length

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">My Dashboard</h1>
        <span className="app-date">{today}</span>
      </header>

      <div className="dashboard-grid">
        {/* Board receives data + callbacks, and only handles rendering and UI events. */}
        <div className="widget widget-kanban">
          <div className="widget-title">Task Board</div>

          <Board
            columns={boardColumns}
            newTaskTitle={newTask}
            onNewTaskTitleChange={setNewTask}
            onTaskCreate={addTask}
            onTaskMove={moveTask}
          />
        </div>

        {/* Timer widget is presentational; App manages countdown logic/state. */}
        <div className="widget">
          <div className="widget-title">Focus Timer</div>

          <PomodoroTimer
            secondsRemaining={focusSecondsRemaining}
            isRunning={isFocusRunning}
            onToggle={toggleFocusTimer}
            onReset={resetFocusTimer}
          />
        </div>

        {/* Notes widget is controlled by App state. */}
        <div className="widget">
          <div className="widget-title">Quick Notes</div>

          <QuickNotes value={notes} onChange={setNotes} />
        </div>

        {/* Progress widget receives derived numbers from task state. */}
        <div className="widget">
          <div className="widget-title">Progress Tracker</div>

          <ProgressTracker completedTasks={completedTasks} totalTasks={tasks.length} />
        </div>
      </div>
    </div>
  )
}

export default App
