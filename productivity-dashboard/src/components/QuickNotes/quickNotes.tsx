// Another controlled input component: value comes from App, changes go back to App.
interface QuickNotesProps {
  // Current note text.
  value: string
  // Called with the latest textarea value.
  onChange: (value: string) => void
}

function QuickNotes({ value, onChange }: QuickNotesProps) {
  return (
    <textarea
      value={value}
      // Keep parent state in sync on every keystroke.
      onChange={event => onChange(event.target.value)}
      placeholder="Jot something down..."
      className="notes-input"
    />
  )
}

export default QuickNotes