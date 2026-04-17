// This component is presentational: it renders timer data received from App.
interface PomodoroTimerProps {
  // Remaining focus time in seconds.
  secondsRemaining: number
  // Whether the countdown is currently active.
  isRunning: boolean
  // Parent callback to start/pause the timer.
  onToggle: () => void
  // Parent callback to reset the timer.
  onReset: () => void
}

// Converts seconds like 1500 into "25:00" for display.
function formatTime(secondsRemaining: number) {
  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function PomodoroTimer({ secondsRemaining, isRunning, onToggle, onReset }: PomodoroTimerProps) {
  return (
    <div className="timer-widget">
      {/* Computed display value from raw seconds. */}
      <div className="timer-value">{formatTime(secondsRemaining)}</div>
      <div className="timer-status">{isRunning ? 'Focus session running' : 'Ready to focus'}</div>

      <div className="timer-actions">
        {/* Toggle button reflects current state textually. */}
        <button onClick={onToggle} className="button button-primary">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={onReset} className="button button-secondary">
          Reset
        </button>
      </div>
    </div>
  )
}

export default PomodoroTimer