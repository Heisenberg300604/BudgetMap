import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/routes'
import { Toaster } from 'react-hot-toast'
import { LoadingProvider } from './Context/LoadingContext'
import { AuthProvider } from './Context/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <LoadingProvider>
          <Toaster />
          <RouterProvider router={router} />;
        </LoadingProvider>
      </AuthProvider>
    </>
  )
}

export default App
