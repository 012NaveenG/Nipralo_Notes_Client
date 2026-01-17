
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndexLayout from './layouts/IndexLayout.tsx'
import LandingPage from './pages/LandingPage.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import Index from './pages/app/Index.tsx'
import SharedNotes from './pages/app/SharedNotes.tsx'
import NoteById from './pages/app/NoteById.tsx'
import SharedNoteById from './pages/app/SharedNoteById.tsx'
import { AuthProvider } from './store/user.store.tsx'
const router = createBrowserRouter([
  {
    path: "",
    element: <IndexLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Index />
      },
      {
        path: '/app/note/:noteId',
        element: <NoteById />
      },
      {
        path: '/app/shared-notes',
        element: <SharedNotes />
      },
      {
        path: '/app/shared-note/:noteId',
        element: <SharedNoteById />
      },
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} ></RouterProvider>
  </AuthProvider>
)
