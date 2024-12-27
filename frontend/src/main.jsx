import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TrialApp from './trialApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <TrialApp/>
  </StrictMode>,
)
