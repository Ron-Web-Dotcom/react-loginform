import { createClient } from '@blinkdotnew/sdk'

function getProjectId(): string {
  return import.meta.env.VITE_BLINK_PROJECT_ID || 'react-login-form-82kdj26e'
}

export const blink = createClient({
  projectId: getProjectId(),
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_1099f302',
  auth: { mode: 'headless' },
})
