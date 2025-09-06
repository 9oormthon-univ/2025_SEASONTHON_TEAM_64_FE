import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import TokenProccesor from './utils/Authorization/TokenProccesor';

const Login = lazy(() => import('./pages/login'));
const Main = lazy(() => import('./pages/main'));
const Admin = lazy(() => import('./pages/admin'));
const Generate = lazy(() => import('./pages/admin/generate/Generate'));
const List = lazy(() => import('./pages/admin/list/List'));
const Feed = lazy(() => import('./pages/main'));
const FeedGenerate = lazy(() => import('./pages/main/generate/Generate'));
const Fortune = lazy(() => import('./pages/fortune'));
const Info = lazy(() => import('./pages/info'));
const MyPage = lazy(() => import('./pages/my'));

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        element: withSuspense(<Main />),
        index: true,
      },
      {
        path: '/fortune',
        element: withSuspense(<Fortune />),
      },
      {
        path: '/info',
        element: withSuspense(<Info />),
      },
      {
        path: '/my-page',
        element: withSuspense(<MyPage />),
      },
    ],
  },
  {
    path: '/login',
    element: withSuspense(<Login />),
  },
  { path: '/oauth2/redirect', element: <TokenProccesor /> },
  {
    path: '/admin',
    element: withSuspense(<Admin />),
  },
  {
    path: '/admin/generate',
    element: withSuspense(<Generate />),
  },
  {
    path: '/admin/list',
    element: withSuspense(<List />),
  },
  {
    path: '/generate',
    element: withSuspense(<FeedGenerate />),
  },
]);

export default router;
