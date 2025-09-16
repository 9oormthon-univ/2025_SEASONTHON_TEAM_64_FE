import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import TokenProccesor from './utils/TokenProccesor';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

const Main = lazy(() => import('./pages/main'));
const Login = lazy(() => import('./pages/login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Main />),
      },
    ],
  },
  {
    path: '/login',
    element: withSuspense(<Login />),
  },
  { path: '/oauth2/redirect', element: <TokenProccesor /> },
]);

export default router;
