import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Bootstrap the React app into the <div id="root"> in index.html.
createRoot(document.getElementById('root')!).render(
  // StrictMode helps catch common issues during development.
  <StrictMode>
    <App />
  </StrictMode>,
)
