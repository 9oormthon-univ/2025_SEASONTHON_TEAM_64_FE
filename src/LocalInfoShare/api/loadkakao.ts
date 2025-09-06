// src/LocalInfoShare/api/loadkakao.ts
let _loadingPromise: Promise<void> | null = null;

export async function loadKakaoOnce(): Promise<void> {
  // 이미 준비됨
  if ((window as any).kakao?.maps) return;

  // 진행 중 로드가 있으면 그거 기다림 (single-flight)
  if (_loadingPromise) {
    await _loadingPromise;
    return;
  }

  const APP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY as string;
  if (!APP_KEY) {
    console.warn("[KAKAO] VITE_KAKAO_MAP_KEY is empty");
  } else {
    console.log("[KAKAO] using key:", APP_KEY.slice(0, 6) + "... (" + APP_KEY.length + " chars)");
  }

  // 이미 붙어있는 스크립트가 있는지 확인
  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
  );

  _loadingPromise = (async () => {
    if (existing) {
      // 기존 스크립트가 있는데 이미 로드 완료라면 통과
      // @ts-ignore
      if (["loaded", "complete"].includes(existing.readyState)) {
        await ensureKakaoReady();
        return;
      }
      // 아직이면 load/error 이벤트 대기
      await new Promise<void>((resolve, reject) => {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load Kakao SDK (existing)")), { once: true });
      });
      await ensureKakaoReady();
      return;
    }

    // 신규로 스크립트 부착 (https 명시)
    await new Promise<void>((resolve, reject) => {
      const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services&autoload=false`;
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (e) => {
        console.warn("[KAKAO] script.onerror", e);
        reject(new Error("Failed to load Kakao SDK"));
      };
      document.head.appendChild(script);
    });

    await ensureKakaoReady();
  })();

  try {
    await _loadingPromise;
  } finally {
    // 다음 호출을 위해 프라미스 해제 (이미 로드됐으니 바로 위 early-return 됨)
    _loadingPromise = null;
  }

  console.log(
    "[KAKAO] ready:",
    !!(window as any).kakao,
    !!(window as any).kakao?.maps,
    !!(window as any).kakao?.maps?.services
  );
  // 필요하면 주석 해제해서 env 값 확인 (브라우저 콘솔 노출 주의)
  // console.log("[ENV] Kakao Key:", import.meta.env.VITE_KAKAO_MAP_KEY);
}

function ensureKakaoReady(): Promise<void> {
  return Promise.race<void>([
    new Promise<void>((resolve) => (window as any).kakao.maps.load(() => resolve())),
    new Promise<void>((_, reject) => setTimeout(() => reject(new Error("kakao.maps.load timeout")), 6000)),
  ]);
}
