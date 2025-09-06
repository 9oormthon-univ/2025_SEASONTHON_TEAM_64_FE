/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_KAKAO_MAP_KEY: string
  readonly VITE_VAPID_PUBLIC_KEY: string
  readonly VITE_API_VERSION: string
  readonly VITE_KAKAO_OAUTH_URL: string
  readonly VITE_FORTUNE_SEND_ENDPOINT: string
  readonly VITE_FORTUNE_OPEN_ENDPOINT: string
  readonly VITE_FORTUNE_GET_ENDPOINT: string
  readonly VITE_FORTUNE_LIST_ENDPOINT: string
  readonly VITE_MISSION_ASSIGNMENTS_ENDPOINT: string
  readonly VITE_MISSION_TODAY_ENDPOINT: string
  readonly VITE_MISSION_DELETE_ENDPOINT: string
  readonly VITE_AUTH_REISSUE_ENDPOINT: string
  readonly VITE_REQUEST_TIMEOUT: string
  readonly VITE_FALLBACK_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
