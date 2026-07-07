import {
  clearStoredSession,
  getAccessToken,
  getStoredSession,
  setStoredSession,
} from '../utils/storage.js'

export function applyInterceptors(client) {
  client.interceptors.request.use((config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const statusCode = error.response?.status
      const isAuthRoute =
        originalRequest?.url?.includes('/auth/login') ||
        originalRequest?.url?.includes('/auth/refresh')

      if (statusCode !== 401 || originalRequest?._retry || isAuthRoute) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const refreshResponse = await client.post('/auth/refresh', {})
        const currentSession = getStoredSession()
        const refreshedSession = {
          ...(currentSession || {}),
          admin: refreshResponse.data.data.admin,
          accessToken: refreshResponse.data.data.accessToken,
        }

        setStoredSession(refreshedSession)
        originalRequest.headers.Authorization = `Bearer ${refreshedSession.accessToken}`

        return client(originalRequest)
      } catch ( refreshError) {
        clearStoredSession()

        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }

        return Promise.reject(refreshError)
      }
    },
  )
}
