import { useMemo, useState } from 'react'
import api from '../services/api.js'
import { AuthContext } from './auth-context.js'
import {
  clearStoredSession,
  getStoredSession,
  setStoredSession,
} from '../utils/storage.js'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredSession())
  const [isReady] = useState(true)

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    const nextSession = response.data.data
    
    setSession(nextSession)
    setStoredSession(nextSession)

    return nextSession
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // Ignore logout transport errors and clear the local session anyway.
    }

    clearStoredSession()
    setSession(null)
  }

  const value = useMemo(
    () => ({
      session,
      admin: session?.admin || null,
      accessToken: session?.accessToken || '',
      isAuthenticated: Boolean(session?.accessToken),
      isReady,
      login,
      logout,
    }),
    [isReady, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
