import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Providers from './providers.jsx'
import AppRoutes from './AppRoutes.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Providers>
          <AppRoutes />
        </Providers>
      </BrowserRouter>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
