import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import TokenProccesor from './utils/TokenProccesor';
import AuthGate from './components/guards/AuthGate';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

const Main = lazy(() => import('./pages/main'));
const Login = lazy(() => import('./pages/login'));
const OnBoarding = lazy(() => import('./pages/onboarding'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGate>
        <DefaultLayout />
      </AuthGate>
    ),
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
  {
    path: '/onboarding',
    element: withSuspense(<OnBoarding />),
  },
  { path: '/oauth2/redirect', element: <TokenProccesor /> },
]);

export default router;
