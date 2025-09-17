import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import TokenProccesor from './utils/TokenProccesor';
import AuthGate from './components/guards/AuthGate';
import RoleBootstrap from './components/guards/RoleBootstrap';
import { ROUTE_PATHS } from './constants/routes';

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<></>}>{node}</Suspense>
);

const buildElement = (node: React.ReactNode, options?: { auth?: boolean }) => {
  const wrapped = options?.auth ? <AuthGate>{node}</AuthGate> : node;
  return withSuspense(wrapped);
};

const Feed = lazy(() => import('./pages/feed'));
const FeedGenerate = lazy(() => import('./pages/feed/generate'));
const FeedModify = lazy(() => import('./pages/feed/modify'));
const Fortune = lazy(() => import('./pages/fortune'));
const FortuneReceive = lazy(() => import('./pages/fortune/receive'));
const FortuneSend = lazy(() => import('./pages/fortune/send'));
const FortuneDetail = lazy(() => import('./pages/fortune/detail'));
const Login = lazy(() => import('./pages/login'));
const OnBoarding = lazy(() => import('./pages/onboarding'));
const Admin = lazy(() => import('./pages/admin'));
const AdminGenerate = lazy(() => import('./pages/admin/generate'));
const AdminList = lazy(() => import('./pages/admin/list'));
const AdminModify = lazy(() => import('./pages/admin/modify'));
const User = lazy(() => import('./pages/user'));
const Notification = lazy(() => import('./pages/notification'));

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ROOT,
    element: (
      <AuthGate>
        <RoleBootstrap />
        <DefaultLayout />
      </AuthGate>
    ),
    children: [
      { index: true, element: withSuspense(<Feed />) },
      {
        path: ROUTE_PATHS.FORTUNE,
        element: buildElement(<Fortune />, { auth: true }),
      },
    ],
  },
  {
    path: ROUTE_PATHS.FEED_GENERATE,
    element: buildElement(<FeedGenerate />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.FEED_MODIFY,
    element: buildElement(<FeedModify />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.FORTUNE_RECEIVE,
    element: buildElement(<FortuneReceive />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.FORTUNE_SEND,
    element: buildElement(<FortuneSend />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.FORTUNE_DETAIL,
    element: buildElement(<FortuneDetail />, { auth: true }),
  },
  { path: ROUTE_PATHS.ADMIN, element: buildElement(<Admin />, { auth: true }) },
  {
    path: ROUTE_PATHS.ADMIN_MODIFY,
    element: buildElement(<AdminModify />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.ADMIN_LIST,
    element: buildElement(<AdminList />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.ADMIN_GENERATE,
    element: buildElement(<AdminGenerate />, { auth: true }),
  },
  {
    path: ROUTE_PATHS.NOTIFICATION,
    element: buildElement(<Notification />, { auth: true }),
  },
  { path: ROUTE_PATHS.USER, element: buildElement(<User />, { auth: true }) },
  { path: ROUTE_PATHS.LOGIN, element: buildElement(<Login />) },
  { path: ROUTE_PATHS.ONBOARDING, element: buildElement(<OnBoarding />) },
  { path: ROUTE_PATHS.OAUTH_REDIRECT, element: <TokenProccesor /> },
];

const router = createBrowserRouter(routes);

export default router;
