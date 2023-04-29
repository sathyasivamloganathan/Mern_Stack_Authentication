import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Username from './Components/Username'
import Password from './Components/Password'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Recovery from './Components/Recovery'
import Reset from './Components/Reset'
import PageNotFound from './Components/PageNotFound'


/**Auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'


const router = createBrowserRouter([
  {
    path:'/',
    element: <Username></Username>
  },
  {
    path:'/register',
    element: <Register></Register>
  },
  {
    path:'/password',
    element: <ProtectRoute><Password /> </ProtectRoute>
  },
  {
    path:'/profile',
    element: <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path:'/recovery',
    element: <Recovery></Recovery>
  },
  {
    path:'/reset',
    element: <Reset></Reset>
  },
  {
    path:'*',
    element: <PageNotFound></PageNotFound>
  },
])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
