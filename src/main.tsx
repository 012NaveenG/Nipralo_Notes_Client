
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndexLayout from './layouts/IndexLayout.tsx'
import LandingPage from './pages/LandingPage.tsx'
const router = createBrowserRouter([
  {
    path: "",
    element: <IndexLayout />,
    children: [
      {
        path: "",
        element: <LandingPage/>
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} ></RouterProvider>
)
