// import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Button, ChakraProvider } from '@chakra-ui/react';
import Homepage from './pages/Homepage';
import CreatePage from './pages/CreatePage';
import Landing from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    children: [
      {
        index: true,
        element: <Landing />,
        // loader: landingLoader,
      },
      {
        path: '/create',
        element: <CreatePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
