import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home.jsx';
import AddCoffee from './Pages/AddCoffee.jsx';
import Coffees from './Pages/Coffees.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Users from './Pages/Users.jsx';
import Update from './Pages/Update.jsx';
import AuthProvider from './AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: '/add-coffee',
        element: <AddCoffee></AddCoffee>
      },
      {
        path: '/coffees',
        element: <Coffees></Coffees>,
        loader: () => fetch('https://simple-crud-users.vercel.app/coffees')
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/users',
        element: <Users></Users>,
        loader: () => fetch('https://simple-crud-users.vercel.app/users')
      },
      {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`https://simple-crud-users.vercel.app/coffees/${params.id}`)
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
