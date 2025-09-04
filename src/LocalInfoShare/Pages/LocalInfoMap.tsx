import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** kakao 타입 선언 */
declare global {
  interface Window {
    kakao: any;
  }
}

/** 카카오 스크립트 1회 로드 */
function loadKakaoOnce(appKey: string) {
  return new Promise<void>((resolve, reject) => {
    // 이미 로드됨
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => resolve());
      return;
    }
    // 스크립트 중복 방지
    const exist = document.querySelector<HTMLScriptElement>(
      'script[src*="//dapi.kakao.com/v2/maps/sdk.js"]'
    );
    if (exist) {
      exist.addEventListener("load", () => {
        window.kakao.maps.load(() => resolve());
      });
      return;
    }
    // 신규 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.addEventListener("load", () => {
      try {
        window.kakao.maps.load(() => resolve());
      } catch (e) {
        reject(e);
      }
    });
    script.addEventListener("error", reject);
    document.head.appendChild(script);
  });
}

type StatePayload = {
  address?: string;   // 이전 화면에서 넘어온 주소 (있으면 지도만 이동/마커표시)
  title?: string;
  category?: string;
  color?: string;
};

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY || "YOUR_KAKAO_JAVASCRIPT_KEY";

export default function LocalInfoMap() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { address: passedAddress, title, category, color } = (state || {}) as StatePayload;

  const mapRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  // ✅ 입력창은 항상 빈 값으로 시작 (placeholder만 보이게)
  const [addressInput, setAddressInput] = useState<string>("");

  // 지도 초기화
  useEffect(() => {
    (async () => {
      await loadKakaoOnce(KAKAO_APP_KEY);
      const kakao = window.kakao;

      // 지도 생성(초기 서울 중심, level=3)
      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      });
      mapObjRef.current = map;

      // 도구 준비
      geocoderRef.current = new kakao.maps.services.Geocoder();
      markerRef.current = new kakao.maps.Marker({ map });
      infoWindowRef.current = new kakao.maps.InfoWindow({ removable: true });

      // 이전 화면에서 주소가 넘어왔다면, 입력값은 변경하지 않고 지도/마커만 표시
      if (passedAddress) {
        locateAndMark(passedAddress, {
          title,
          category,
          color,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 주소로 이동 + 마커/말풍선 표시 */
  const locateAndMark = useCallback(
    (addr: string, meta?: { title?: string; category?: string; color?: string }) => {
      const kakao = window.kakao;
      const geocoder = geocoderRef.current as any;
      const map = mapObjRef.current as any;
      const marker = markerRef.current as any;
      const info = infoWindowRef.current as any;

      if (!geocoder || !map || !marker || !info) return;

      geocoder.addressSearch(addr, (result: any[], status: string) => {
        if (status !== kakao.maps.services.Status.OK || !result.length) {
          alert("해당 주소를 찾을 수 없습니다.");
          return;
        }
        const { x, y, address: _addressObj } = result[0]; // x:lng, y:lat
        const position = new kakao.maps.LatLng(Number(y), Number(x));
        map.setCenter(position);
        marker.setPosition(position);

        const content = `
          <div style="
            padding:10px 12px;
            border-radius:10px;
            border:1px solid #ddd;
            background:#fff;
            font-size:13px;
            line-height:1.4;
            max-width:240px;
          ">
            <div style="font-weight:700;margin-bottom:4px;">${meta?.title ?? "장소"}</div>
            <div style="margin-bottom:6px;color:#666;">${addr}</div>
            ${
              meta?.category
                ? `<span style="display:inline-block;padding:2px 8px;border-radius:6px;font-weight:700;color:#fff;background:${
                    meta?.color || "#ff8a00"
                  }">${meta.category}</span>`
                : ""
            }
          </div>
        `;
        info.setContent(content);
        info.open(map, marker);

        // 마커 클릭 시 말풍선 토글
        kakao.maps.event.addListener(marker, "click", () => {
          info.getMap() ? info.close() : info.open(map, marker);
        });
      });
    },
    []
  );

  /** 입력창 검색 버튼/엔터 처리 */
  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const q = addressInput.trim();
      if (!q) {
        alert("주소를 입력하세요.");
        return;
      }
      locateAndMark(q);
    },
    [addressInput, locateAndMark]
  );

  /** 현재 브라우저 위치로 이동 (옵션) */
  const handleMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const kakao = window.kakao;
        const map = mapObjRef.current as any;
        const marker = markerRef.current as any;
        const info = infoWindowRef.current as any;

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const position = new kakao.maps.LatLng(lat, lng);

        map.setCenter(position);
        marker.setPosition(position);
        info.setContent(`<div style="padding:8px 10px;">내 위치</div>`);
        info.open(map, marker);
      },
      () => alert("현재 위치를 가져올 수 없습니다."),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 상단 바 */}
      <div
        style={{
          padding: "10px 12px",
          borderBottom: "1px solid #eee",
          background: "#fff",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ border: "none", background: "transparent", fontSize: 16, cursor: "pointer" }}
          aria-label="뒤로가기"
        >
          ←
        </button>

        {/* 검색 입력 영역 */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 6 }}>
          <input
            value={addressInput}                // ✅ 항상 state로 관리
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="주소를 입력하세요"    // ✅ placeholder만 보임
            style={{
              width: 220,
              height: 36,
              borderRadius: 8,
              border: "1px solid #ddd",
              padding: "0 10px",
            }}
          />
          <button
            type="submit"
            style={{
              height: 36,
              padding: "0 12px",
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#f6f6f6",
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </form>

        <button
          onClick={handleMyLocation}
          style={{
            border: "1px solid #e0e0e0",
            background: "#f6f6f6",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          내 위치
        </button>
      </div>

      {/* 지도 영역 */}
      <div ref={mapRef} style={{ flex: 1 }} />

      {/* 하단 안내(선택) */}
      {passedAddress && (
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            borderTop: "1px solid #eee",
            padding: "8px 12px",
            fontSize: 12,
            color: "#666",
          }}
        >
        </div>
      )}
    </div>
  );
}
