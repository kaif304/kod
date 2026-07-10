const SESSION_KEY = 'kod_admin_session'

export function getStoredSession() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawSession = localStorage.getItem(SESSION_KEY)

    if (!rawSession) {
      return null
    }

    return JSON.parse(rawSession)
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function setStoredSession(session) {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearStoredSession() {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(SESSION_KEY)
}

export function getAccessToken() {
  return getStoredSession()?.accessToken ?? ''
}

export function isLoggedIn() {
  return Boolean(getAccessToken())
}






// const SESSION_KEY = 'kod_admin_session'

// export function getStoredSession() {
//   if (typeof window === 'undefined') {
//     return null
//   }

//   const rawValue = window.localStorage.getItem(SESSION_KEY)

//   if (!rawValue) {
//     return null
//   }

//   try {
//     return JSON.parse(rawValue)
//   } catch {
//     window.localStorage.removeItem(SESSION_KEY)
//     return null
//   }
// }

// export function setStoredSession(session) {
//   if (typeof window === 'undefined') {
//     return
//   }

//   window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
// }

// export function clearStoredSession() {
//   if (typeof window === 'undefined') {
//     return
//   }

//   window.localStorage.removeItem(SESSION_KEY)
// }

// export function getAccessToken() {
//   return getStoredSession()?.accessToken || ''
// }
