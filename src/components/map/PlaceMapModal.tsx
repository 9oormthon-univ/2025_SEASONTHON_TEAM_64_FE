import React, { useEffect, useMemo, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import * as S from './PlaceMapModal.styles';
import back from '../../assets/information/left-arrow.svg';
import orangeMarker from '../../assets/information/marker-orange.svg';

type Props = {
  open: boolean;
  onClose: () => void;
  lat: number;
  lng: number;
  name?: string;
  address?: string;
  categoryLabel?: string;
  categoryColor?: string;
};

function getJsApiKey(): string | undefined {
  const raw = process.env.REACT_APP_KAKAOMAP_JS_KEY;
  return typeof raw === 'string' ? raw.trim() : undefined;
}

function getKakaoRestKey(): string | undefined {
  const raw = process.env.REACT_APP_KAKAOMAP_KEY;
  return typeof raw === 'string' ? raw.trim() : undefined;
}

async function fetchBuildingName(lat: number, lng: number, apiKey?: string) {
  if (!apiKey) return undefined;
  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
          Accept: 'application/json',
        },
      },
    );
    if (!res.ok) return undefined;
    const json = await res.json();
    const doc = json?.documents?.[0];
    const bname = doc?.road_address?.building_name as string | undefined;
    return bname && bname.trim().length > 0 ? bname.trim() : undefined;
  } catch {
    return undefined;
  }
}

export default function PlaceMapModal({
  open,
  onClose,
  lat,
  lng,
  name,
  address,
  categoryLabel,
  categoryColor = '#7595B7',
}: Props) {
  const jsKey = getJsApiKey();
  const restKey = getKakaoRestKey();
  const [buildingName, setBuildingName] = useState<string | undefined>();

  const center = { lat, lng } as const;

  useEffect(() => {
    fetchBuildingName(lat, lng, restKey).then(setBuildingName);
  }, [lat, lng, restKey]);

  const title = useMemo(
    () => buildingName || name || address,
    [buildingName, name, address],
  );

  const markerImage = useMemo(
    () => ({
      src: orangeMarker,
      size: { width: 52, height: 63 },
      options: { offset: { x: 34, y: 64 } },
    }),
    [],
  );

  const InfoCard = (
    <S.InfoCard>
      {title && <div className="name">{title}</div>}
      {address && <div className="addr">{address}</div>}
      {categoryLabel && (
        <div className="chip" style={{ background: categoryColor }}>
          {categoryLabel}
        </div>
      )}
    </S.InfoCard>
  );

  useKakaoLoader({ appkey: jsKey || '', libraries: ['services'] });

  if (!open) return null;

  return (
    <S.Overlay>
      <S.Panel>
        <S.Header>
          <img src={back} alt="뒤로가기" onClick={onClose} />
          <div className="title">상세 위치</div>
        </S.Header>
        <S.MapArea>
          <Map
            center={center}
            style={{ width: '100%', height: '100%' }}
            level={3}
            isPanto
            draggable={false}
            zoomable={false}
          >
            <MapMarker position={center} image={markerImage} />
          </Map>
          {InfoCard}
        </S.MapArea>
      </S.Panel>
    </S.Overlay>
  );
}
