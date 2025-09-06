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
  SearchField,
  SearchInput,
  SearchIconBtn,
  CurrentLocationBtn,
  ConfirmRow,
  ConfirmButton,
  ScreenTitle,
} from "../Styles/LocalInfoAddress.styles";

import { loadKakaoOnce } from "../api/loadkakao";
import styled from "styled-components";

declare global {
  interface Window {
    daum: any;
    kakao: any;
  }
}

function loadDaumPostcode(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.daum?.Postcode) return resolve();
    const exist = document.querySelector<HTMLScriptElement>(
      'script[src*="t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
    );
    if (exist) {
      exist.addEventListener("load", () => resolve());
      exist.addEventListener("error", () => reject(new Error("postcode load error")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("postcode load error")));
    document.head.appendChild(script);
  });
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  await loadKakaoOnce();
  return new Promise<string>((resolve, reject) => {
    const svc = window.kakao?.maps?.services;
    if (!svc) return reject(new Error("kakao.maps.services not ready"));
    const geocoder = new svc.Geocoder();
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

function watchBestPosition(
  maxWaitMs = 10000,
  targetAccM = 80,
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

  const [showPostcode, setShowPostcode] = React.useState(false);
  const embedRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let restoreOverflow = "";
    let postcode: any;

    if (!showPostcode) return;
    restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    loadDaumPostcode().then(() => {
      if (!embedRef.current) return;
      postcode = new window.daum.Postcode({
        oncomplete: (data: any) => {
          const road = data.roadAddress || data.address || "";
          setCoords(null);
          setAddress(road);
          setShowPostcode(false);
        },
        width: "100%",
        height: "100%",
      });
      postcode.embed(embedRef.current, { autoClose: false });
    });

    return () => {
      document.body.style.overflow = restoreOverflow;
    };
  }, [showPostcode]);

  const openPostcodeOverlay = () => setShowPostcode(true);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저는 현재 위치를 지원하지 않아요.");
      return;
    }
    setLocLoading(true);

    const opts: PositionOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

    navigator.geolocation.getCurrentPosition(
      async (first) => {
        try {
          let chosen = first;
          const acc1 = first.coords.accuracy ?? 999999;

          if (acc1 > 150) {
            try {
              const better = await watchBestPosition(10000, 80, opts);
              chosen = better;
            } catch {}
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

        <ScreenTitle>주소를 선택해주세요.</ScreenTitle>

        <SearchField>
          <SearchInput
            placeholder="도로명, 건물명, 지번 입력"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && openPostcodeOverlay()}
          />
          <SearchIconBtn type="button" aria-label="주소 검색" onClick={openPostcodeOverlay}>
            <Search size={16} />
          </SearchIconBtn>
        </SearchField>

        <CurrentLocationBtn type="button" onClick={useMyLocation} disabled={locLoading}>
          <Crosshair size={14} />
          {locLoading ? "현재 위치 확인 중..." : "현재 위치로 설정"}
        </CurrentLocationBtn>

        <ConfirmRow>
          <ConfirmButton type="button" onClick={handleConfirm}>
            이 주소로 등록하기
          </ConfirmButton>
        </ConfirmRow>

        <BottomBar />
      </Container>

      {showPostcode && (
        <Overlay role="dialog" aria-modal="true">
          <Sheet>
            <SheetHeader>
              <strong>주소 검색</strong>
              <CloseBtn onClick={() => setShowPostcode(false)} aria-label="닫기">
                ✕
              </CloseBtn>
            </SheetHeader>
            <EmbedBox ref={embedRef} />
          </Sheet>
        </Overlay>
      )}
    </Wrapper>
  );
};

export default LocalInfoAddress;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  overscroll-behavior: contain;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 420px;
  height: 82dvh;
  background: #fff;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: max(0px, env(safe-area-inset-bottom));

  @media (max-width: 420px) {
    height: 88dvh;
    border-radius: 14px;
  }
`;

const SheetHeader = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
`;

const CloseBtn = styled.button`
  border: 0;
  background: transparent;
  font-size: 18px;
  line-height: 1;
  padding: 8px;
  min-width: 40px;
  min-height: 40px;
  cursor: pointer;
`;

const EmbedBox = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;
