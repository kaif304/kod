import { BrowserRouter } from 'react-router-dom'
import Providers from './providers.jsx'
import AppRoutes from './AppRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  )
}

export default App
