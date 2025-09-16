import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import TokenProccesor from './utils/TokenProccesor';
import AuthGate from './components/guards/AuthGate';
import RoleBootstrap from './components/guards/RoleBootstrap';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

const withAuth = (element: React.ReactNode) =>
  withSuspense(<AuthGate>{element}</AuthGate>);

const Main = lazy(() => import('./pages/main'));
const Login = lazy(() => import('./pages/login'));
const OnBoarding = lazy(() => import('./pages/onboarding'));
const Admin = lazy(() => import('./pages/admin'));
const User = lazy(() => import('./pages/user'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGate>
        <RoleBootstrap />
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
    path: '/admin',
    element: withAuth(<Admin />),
  },
  {
    path: '/user',
    element: withAuth(<User />),
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
