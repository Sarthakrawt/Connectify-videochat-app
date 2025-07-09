import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import {
    CallPage,
    HomePage,
    LoginPage,
    NotificationPage,
    OnBoardingPage,
    ChatPage,
    SignUpPage
} from "./pages/importPage.js"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const router = createBrowserRouter(
  [
     {path: "",
    element:<App/>,
    children: [
        {path: "/",
          element: <HomePage/>
        },
        {
          path:"/signup",
          element:<SignUpPage/>
        },
        {
          path:"/login",
          element:<LoginPage/>
        },
        {
          path:"/notification",
          element:<NotificationPage/>
        },
        {
          path:"/onboard",
          element:<OnBoardingPage/>
        },
        {
          path:"/call/:id",
          element:<CallPage/>
        },
        {
          path:"/chat/:id",
          element:<ChatPage/>
        } 
      ]
      }
      ]
      
    
  
)

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} >
  </RouterProvider>
  </QueryClientProvider>,
)
