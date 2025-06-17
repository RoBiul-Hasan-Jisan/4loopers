import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App should only contain layout (Header/Footer)
    children: [
      { path: '/login', element: <LogIn /> },
      { path: '/signin', element: <SignIn /> },
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <MovieDetails /> },
      { path: "/search", element: <Search /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
