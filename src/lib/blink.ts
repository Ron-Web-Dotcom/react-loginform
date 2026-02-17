import { createClient } from '@blinkdotnew/sdk'

function getProjectId(): string {
  const envId = import.meta.env.VITE_BLINK_PROJECT_ID
  if (envId) return envId
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const match = hostname.match(/^([^.]+)\.sites\.blink\.new$/)
  return match ? match[1] : 'react-login-form-82kdj26e'
}

export const blink = createClient({
  projectId: getProjectId(),
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_1099f302',
  auth: { mode: 'managed' },
})
