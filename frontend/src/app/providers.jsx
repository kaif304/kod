import { AuthProvider } from '../context/AuthContext.jsx'

function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

export default Providers
