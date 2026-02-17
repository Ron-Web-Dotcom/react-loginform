import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BlinkProvider, BlinkAuthProvider } from '@blinkdotnew/react'
import App from './App'
import './index.css'

function getProjectId() {
  return import.meta.env.VITE_BLINK_PROJECT_ID || 'react-login-form-82kdj26e'
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BlinkProvider 
      projectId={getProjectId()} 
      publishableKey={import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_1099f302'}
    >
      <BlinkAuthProvider>
        <App />
      </BlinkAuthProvider>
    </BlinkProvider>
  </StrictMode>
)
