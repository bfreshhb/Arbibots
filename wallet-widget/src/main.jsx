import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'

const mountEl = document.getElementById('arbibots-wallet-widget')
if (mountEl) {
  createRoot(mountEl).render(<App />)
}
