import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/routes'
import { Toaster } from 'react-hot-toast'
import { LoadingProvider } from './Context/LoadingContext'
import { UserProvider } from './Context/userContext'

function App() {

  return (
    <>
      <UserProvider>
        <LoadingProvider>
          <Toaster />
          <RouterProvider router={router} />;
        </LoadingProvider>
      </UserProvider>
    </>
  )
}

export default App
