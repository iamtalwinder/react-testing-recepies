

import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './NavBar';
import Profile from './Profile';

const HomePage = () => <div>Home Page</div>;
const ProtectedPage = () => <div>Protected Page</div>;

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/profile/:userId', element: <Profile /> },
    {
      path: '/protected',
      element: <ProtectedRoute />,
      children: [
        { path: '', element: <ProtectedPage /> }
      ]
    },
  ]);
  return routes;
};

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;

