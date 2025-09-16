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

const Main = lazy(() => import('./pages/main'));
const Login = lazy(() => import('./pages/login'));
const OnBoarding = lazy(() => import('./pages/onboarding'));
const Admin = lazy(() => import('./pages/admin'));
const AdminGenerate = lazy(() => import('./pages/admin/generate'));
const AdminList = lazy(() => import('./pages/admin/list'));
const AdminModify = lazy(() => import('./pages/admin/modify'));
const User = lazy(() => import('./pages/user'));

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ROOT,
    element: (
      <AuthGate>
        <RoleBootstrap />
        <DefaultLayout />
      </AuthGate>
    ),
    children: [{ index: true, element: withSuspense(<Main />) }],
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
  { path: ROUTE_PATHS.USER, element: buildElement(<User />, { auth: true }) },
  { path: ROUTE_PATHS.LOGIN, element: buildElement(<Login />) },
  { path: ROUTE_PATHS.ONBOARDING, element: buildElement(<OnBoarding />) },
  { path: ROUTE_PATHS.OAUTH_REDIRECT, element: <TokenProccesor /> },
];

const router = createBrowserRouter(routes);

export default router;
