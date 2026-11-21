import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import {AppContext} from './context/Context'
import App from './App.tsx'
import Quests from './pages/Quests' 
import Characters from './pages/Characters' 
import Profile from './pages/Profile'
import QuestDetails from './pages/QuestDetails'
import Error from './pages/Error'
import {Toaster} from "sonner"

const router = createBrowserRouter([
  {
    path: "/",
    element : <App />
  },{
    path: "/quests",
    element: <Quests />
  }/* ,{
    path: "/characters",
    element: <Characters />
  } */,{
    path: "/profile",
    element : <Profile />
  },{
    path: "quests/:id",
    element : <QuestDetails />
  },{
    path: "*",
    element : <Error />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext >
      <Toaster position="bottom-right" richColors theme="dark" />
      <RouterProvider router={router} />
    </AppContext>
  </StrictMode>,
)
