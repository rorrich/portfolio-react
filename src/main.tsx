import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/variables.css'
import './styles/base.css'
import './styles/themes.css'
import './styles/utilities.css'
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
