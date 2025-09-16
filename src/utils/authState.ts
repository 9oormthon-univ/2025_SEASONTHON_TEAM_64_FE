export const ONBOARDING_KEY = 'onboarding:v1';

export const hasToken = () => {
  const access = sessionStorage.getItem('accessToken');
  const refresh = sessionStorage.getItem('refreshToken');
  return Boolean(access && refresh);
};

export const isOnboardingDone = () =>
  localStorage.getItem(ONBOARDING_KEY) === 'done';

export const setOnboardingDone = () =>
  localStorage.setItem(ONBOARDING_KEY, 'done');
