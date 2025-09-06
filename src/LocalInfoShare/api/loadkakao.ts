// src/LocalInfoShare/api/loadkakao.ts

type LoadOptions = {
  appKey?: string;
  autoload?: boolean;
  libraries?: Array<"services" | "clusterer" | "drawing">;
  timeoutMs?: number;
};

let _loadingPromise: Promise<void> | null = null;
let _ready = false;

const SDK_HOST = "https://dapi.kakao.com/v2/maps/sdk.js";

export function __resetKakaoLoaderForDev() {
  _loadingPromise = null;
  _ready = false;
}

export function getKakao(): any | null {
  return typeof window !== "undefined" ? (window as any).kakao ?? null : null;
}

export async function loadKakaoOnce(opts: LoadOptions = {}): Promise<void> {
  if (typeof window === "undefined") return; // SSR 보호

  if ((window as any).kakao?.maps) {
    _ready = true;
    return;
  }

  if (_ready && _loadingPromise == null) return;

  if (_loadingPromise) {
    await _loadingPromise;
    return;
  }

  const {
    appKey = import.meta.env.VITE_KAKAO_MAP_KEY as string || "fb1e320763693968db7c5cb1eabf2e35",
    autoload = false,
    libraries = ["services"],
    timeoutMs = 10_000,
  } = opts;

  if (!appKey) {
    console.warn("[KAKAO] VITE_KAKAO_MAP_KEY is empty");
  } else {
    console.debug("[KAKAO] using key:", appKey.slice(0, 6) + "... (" + appKey.length + " chars)");
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src^="${SDK_HOST}"]`
  );

  const makeUrl = () => {
    const libs = libraries.length ? `&libraries=${libraries.join(",")}` : "";
    const auto = `&autoload=${autoload ? "true" : "false"}`;
    return `${SDK_HOST}?appkey=${encodeURIComponent(appKey || "")}${libs}${auto}`;
  };

  _loadingPromise = (async () => {
    if (existing) {
      if (!existing.src.includes(appKey)) {
        console.warn("[KAKAO] existing SDK was loaded with a different appKey.");
      }

      await waitForScript(existing, timeoutMs);
      await ensureKakaoReady(autoload, timeoutMs);
      return;
    }

    const script = document.createElement("script");
    script.src = makeUrl();
    script.async = true;

    const inserted = new Promise<void>((resolve, reject) => {
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Failed to load Kakao SDK")),
        { once: true }
      );
    });

    document.head.appendChild(script);
    await withTimeout(inserted, timeoutMs, "Kakao SDK load timeout");

    await ensureKakaoReady(autoload, timeoutMs);
  })();

  try {
    await _loadingPromise;
    _ready = true;
  } finally {
    _loadingPromise = null;
  }

  const kakao = (window as any).kakao;
  console.debug(
    "[KAKAO] ready:",
    Boolean(kakao),
    Boolean(kakao?.maps),
    Boolean(kakao?.maps?.services)
  );
}

export async function loadKakaoOnceDefault(): Promise<void> {
  return loadKakaoOnce();
}


function withTimeout<T>(p: Promise<T>, ms: number, msg: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(msg)), ms)),
  ]);
}

async function waitForScript(el: HTMLScriptElement, timeoutMs: number) {
  if ((el as any).readyState && ["loaded", "complete"].includes((el as any).readyState)) return;

  await withTimeout(
    new Promise<void>((resolve, reject) => {
      const onLoad = () => resolve();
      const onErr = () => reject(new Error("Failed to load Kakao SDK (existing)"));
      el.addEventListener("load", onLoad, { once: true });
      el.addEventListener("error", onErr, { once: true });
    }),
    timeoutMs,
    "Kakao SDK load timeout (existing)"
  );
}

async function ensureKakaoReady(autoload: boolean, timeoutMs: number) {
  const kakao = (window as any).kakao;
  if (!kakao) throw new Error("Kakao global not present");

  if (autoload) {
    if (!kakao.maps) {
      await withTimeout(
        new Promise<void>((resolve) => {
          const id = setInterval(() => {
            if (kakao.maps) {
              clearInterval(id);
              resolve();
            }
          }, 50);
        }),
        timeoutMs,
        "kakao.maps autoload wait timeout"
      );
    }
    return;
  }


  await withTimeout(
    new Promise<void>((resolve) => kakao.maps.load(() => resolve())),
    timeoutMs,
    "kakao.maps.load timeout"
  );
}
