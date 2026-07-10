import { useContext } from 'react'
import { AuthContext } from '../context/auth-context.js'

export default function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}



// import { useContext } from 'react'
// import { AuthContext } from '../context/auth-context.js'

// function useAuth() {
//   const context = useContext(AuthContext)

//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider')
//   }

//   return context
// }

// export default useAuth
