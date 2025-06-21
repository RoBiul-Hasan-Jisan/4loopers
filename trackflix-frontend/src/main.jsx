import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import LiveShow from './pages/LiveShow';
import NewToMovies from './components/FooterExtra/NewToMovies'; // ✅ New import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/search', element: <Search /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/liveshow', element: <LiveShow /> },
      { path: '/new-to-movies', element: <NewToMovies /> }, // ✅ New route
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
