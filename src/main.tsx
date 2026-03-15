import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// index.css removed — styles are in app.css
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
