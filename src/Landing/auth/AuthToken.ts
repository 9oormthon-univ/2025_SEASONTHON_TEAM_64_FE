// src/auth/AuthToken.ts
export const AuthToken = {
  save(access?: string | null, refresh?: string | null) {
    if (access) sessionStorage.setItem("accessToken", access);
    if (refresh) sessionStorage.setItem("refreshToken", refresh);
  },
  clear() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  },
  isAuthed() {
    return !!sessionStorage.getItem("accessToken");
  },
};
