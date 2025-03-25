import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto'; // Per importare il peso base (400)
import '@fontsource/roboto/500.css'; // Per il peso 500
import '@fontsource/roboto/700.css'; // Per il peso 700

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
