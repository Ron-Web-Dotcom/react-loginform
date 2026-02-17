import { createClient } from '@blinkdotnew/sdk'

/**
 * getProjectId
 * 
 * Helper function to retrieve the Blink Project ID from environment variables.
 * Falls back to the hardcoded ID for development stability.
 */
function getProjectId(): string {
  return import.meta.env.VITE_BLINK_PROJECT_ID || 'react-login-form-82kdj26e'
}

/**
 * Blink SDK Client Initialization
 * 
 * Configures the Blink SDK with the necessary project credentials and 
 * sets the authentication mode to 'headless' for a custom UI experience.
 */
export const blink = createClient({
  projectId: getProjectId(),
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_1099f302',
  auth: { mode: 'headless' },
})
