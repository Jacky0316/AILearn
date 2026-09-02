import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/design.css'
import './styles/layout.css'
import './styles/lesson.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
