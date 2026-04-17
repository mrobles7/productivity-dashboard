// Simple read-only widget driven by numbers from App.
interface ProgressTrackerProps {
  // Number of tasks currently in the done column.
  completedTasks: number
  // Total number of tasks across all columns.
  totalTasks: number
}

function ProgressTracker({ completedTasks, totalTasks }: ProgressTrackerProps) {
  // Avoid divide-by-zero: show 0% when there are no tasks.
  const completion = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return (
    <div>
      <div className="progress-summary">{completion}% complete</div>
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
      </div>
      <div className="progress-caption">
        {completedTasks} of {totalTasks} tasks are finished.
      </div>
    </div>
  )
}

export default ProgressTracker