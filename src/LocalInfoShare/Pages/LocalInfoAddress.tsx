// src/LocalInfoShare/Pages/LocalInfoAddress.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../Styles/Icons/BackIcon";
import { BackIconBox } from "../../Styles/Components/Atoms/BackIconBox";
import { IconRow } from "../../Styles/Components/Layout/IconRow";
import { Search, Crosshair } from "lucide-react";
import BellIcon from "../../Styles/Icons/BellIcon";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";

import { Wrapper, Container } from "../Styles/LocalInfoForm.Styles";
import {
  SearchBar,
  AddressInput,
  SearchIconBtn,
  CurrentLocationBtn,
  ConfirmRow,
  ConfirmButton,
} from "../Styles/LocalInfoAddress.styles";

import { loadKakaoOnce } from "../api/loadkakao";

declare global {
  interface Window {
    daum: any;
    kakao: any;
  }
}

/** Daum Postcode 로더 */
function loadDaumPostcode(): Promise<void> {
  return new Promise((resolve) => {
    if (window.daum?.Postcode) return resolve();
    const exist = document.querySelector<HTMLScriptElement>(
      'script[src*="t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
    );
    if (exist) {
      exist.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.addEventListener("load", () => resolve());
    document.head.appendChild(script);
  });
}

/** 좌표 → 주소 */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  await loadKakaoOnce();
  return new Promise<string>((resolve, reject) => {
    const svc = window.kakao?.maps?.services;
    if (!svc) return reject(new Error("kakao.maps.services not ready"));
    const geocoder = new svc.Geocoder();
    // Kakao는 x=lng, y=lat 순서
    geocoder.coord2Address(lng, lat, (result: any[], status: any) => {
      if (status !== svc.Status.OK || !result?.length) {
        return reject(new Error("no reverse geocode result"));
      }
      const road = result[0]?.road_address?.address_name;
      const jibun = result[0]?.address?.address_name;
      resolve(road || jibun || "");
    });
  });
}

type Coords = { lat: number; lng: number };

/** 짧은 시간 동안 watch해서 가장 정확한 좌표 선택 */
function watchBestPosition(
  maxWaitMs = 10000,      // 최대 10초
  targetAccM = 80,        // 이 이하 정확도면 즉시 종료
  options: PositionOptions = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    let best: GeolocationPosition | null = null;
    let watchId: number | null = null;

    const timer = setTimeout(() => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      best ? resolve(best) : reject(new Error("watch timeout"));
    }, maxWaitMs);

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const acc = pos.coords.accuracy ?? 999999;
        if (!best || acc < (best.coords.accuracy ?? 999999)) {
          best = pos;
          if (acc <= targetAccM) {
            clearTimeout(timer);
            if (watchId !== null) navigator.geolocation.clearWatch(watchId);
            resolve(best);
          }
        }
      },
      (err) => {
        clearTimeout(timer);
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        reject(err);
      },
      { ...options, maximumAge: 0 }
    );
  });
}

const LocalInfoAddress: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState("");
  const [coords, setCoords] = React.useState<Coords | null>(null);
  const [locLoading, setLocLoading] = React.useState(false);

  const openPostcode = async () => {
    await loadDaumPostcode();
    const pc = new window.daum.Postcode({
      oncomplete: (data: any) => {
        const road = data.roadAddress || data.address || "";
        setCoords(null);
        setAddress(road);
      },
    });
    pc.open({ autoClose: true });
  };

  /** 현재 위치(정확도 향상 포함) */
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저는 현재 위치를 지원하지 않아요.");
      return;
    }
    setLocLoading(true);

    const opts: PositionOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

    // 1) 빠르게 한 번
    navigator.geolocation.getCurrentPosition(
      async (first) => {
        try {
          let chosen = first;
          const acc1 = first.coords.accuracy ?? 999999;

          // 2) 정확도가 떨어지면 10초간 watch로 더 좋은 값 대기
          if (acc1 > 150) {
            try {
              const better = await watchBestPosition(10000, 80, opts);
              chosen = better;
            } catch {
              // watch 실패/타임아웃은 무시하고 first 사용
            }
          }

          const { latitude, longitude } = chosen.coords;
          const human = await reverseGeocode(latitude, longitude);
          setAddress(human);
          setCoords({ lat: latitude, lng: longitude });
        } catch {
          setAddress("내 현재 위치");
          setCoords({ lat: first.coords.latitude, lng: first.coords.longitude });
        } finally {
          setLocLoading(false);
        }
      },
      () => {
        alert("정확한 현재 위치를 가져오지 못했습니다.\n모바일(HTTPS) 환경에서 다시 시도하거나, 주소 검색을 이용해 주세요.");
        setLocLoading(false);
      },
      opts
    );
  };

  const handleConfirm = () => {
    if (!address.trim() && !coords) {
      alert("주소를 선택하거나 현재 위치를 설정하세요.");
      return;
    }
    // LocalInfoForm으로 주소/좌표 전달
    navigate("/localinfoform", { state: { address, coords, from: "LocalInfoAddress" } });
  };

  return (
    <Wrapper>
      <Container>
        <IconRow>
          <BackIconBox onClick={() => navigate(-1)}>
            <BackIcon />
          </BackIconBox>
          <BellIcon />
        </IconRow>

        <SearchBar>
          <AddressInput
            placeholder="도로명, 건물명, 지번 입력"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && openPostcode()}
          />
          <SearchIconBtn type="button" aria-label="주소 검색" onClick={openPostcode}>
            <Search size={18} />
          </SearchIconBtn>
        </SearchBar>

        <CurrentLocationBtn type="button" onClick={useMyLocation} disabled={locLoading}>
          <Crosshair size={14} />
          {locLoading ? "현재 위치 확인 중..." : "현재 위치로 설정"}
        </CurrentLocationBtn>

        <ConfirmRow>
          <ConfirmButton type="button" onClick={handleConfirm}>
            이 주소로 등록
          </ConfirmButton>
        </ConfirmRow>

        <BottomBar />
      </Container>
    </Wrapper>
  );
};

export default LocalInfoAddress;
