export const ROUTE_PATHS = {
  ROOT: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  OAUTH_REDIRECT: '/oauth2/redirect',
  ADMIN: '/admin',
  ADMIN_GENERATE: '/admin/generate',
  ADMIN_LIST: '/admin/list',
  ADMIN_MODIFY: '/admin/modify/:missionId',
  USER: '/user',
  FEED_GENERATE: '/create',
} as const;

export type RouteKey = keyof typeof ROUTE_PATHS;
export type RoutePath = (typeof ROUTE_PATHS)[RouteKey];

export const PROTECTED_ROUTES: RoutePath[] = [
  ROUTE_PATHS.ROOT,
  ROUTE_PATHS.ADMIN,
  ROUTE_PATHS.ADMIN_GENERATE,
  ROUTE_PATHS.ADMIN_LIST,
  ROUTE_PATHS.ADMIN_MODIFY,
  ROUTE_PATHS.USER,
];
