// import LandingPage from './Pages/LandingPage'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/routes'


function App() {

  return (
    <>
      {/* <Login/> */}
      {/* <LandingPage/> */}
      <RouterProvider router={router} />;
      {/* <Register/> */}
    </>
  )
}

export default App
