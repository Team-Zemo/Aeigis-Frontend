import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize MirageJS in development
// if (import.meta.env.DEV) {
//   const { makeServer } = await import('./mirage/server.js');
//   makeServer({ environment: 'development' });
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
