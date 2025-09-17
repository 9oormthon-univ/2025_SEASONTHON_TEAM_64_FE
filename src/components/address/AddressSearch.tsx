import React, { useEffect, useMemo, useState } from 'react';
import * as S from './AddressSearch.styles';
import back from '../../assets/information/left-arrow.svg';
import searchIcon from '../../assets/information/search-icon.svg';

type KakaoPlace = {
  id?: string;
  place_name?: string;
  road_address_name?: string;
  address_name?: string;
  x?: string;
  y?: string;
};

export type AddressSearchValue = {
  displayName: string;
  roadAddress?: string;
  jibunAddress?: string;
  lat?: number;
  lng?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (value: AddressSearchValue) => void;
  initialKeyword?: string;
};

const kakaoHost = 'https://dapi.kakao.com';

function getKakaoRestKey(): string | undefined {
  const raw = process.env.REACT_APP_KAKAOMAP_KEY;
  return typeof raw === 'string' ? raw.trim() : undefined;
}

async function searchKeyword(keyword: string, apiKey?: string) {
  if (!apiKey) throw new Error('Kakao REST API key is missing');
  const res = await fetch(
    `${kakaoHost}/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&page=1&size=15`,
    {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
        Accept: 'application/json',
      },
    },
  );
  if (!res.ok) {
    let msg = '검색 실패';
    try {
      const err = await res.json();
      msg = err?.message || msg;
    } catch {
      // ignore parse error
    }
    throw new Error(msg);
  }
  const json = await res.json();
  return (json.documents as KakaoPlace[]) || [];
}

async function reverseGeocode(lat: number, lng: number, apiKey?: string) {
  if (!apiKey) throw new Error('Kakao REST API key is missing');
  const res = await fetch(
    `${kakaoHost}/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
        Accept: 'application/json',
      },
    },
  );
  if (!res.ok) {
    let msg = '역지오코딩 실패';
    try {
      const err = await res.json();
      msg = err?.message || msg;
    } catch {
      // ignore parse error
    }
    throw new Error(msg);
  }
  const json = await res.json();
  const doc = json.documents?.[0];
  const road = doc?.road_address?.address_name;
  const jibun = doc?.address?.address_name;
  return { road, jibun };
}

export default function AddressSearch({
  open,
  onClose,
  onSelect,
  initialKeyword,
}: Props) {
  const apiKey = getKakaoRestKey();
  const [keyword, setKeyword] = useState(initialKeyword ?? '');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<KakaoPlace[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const hasSelection = selectedIdx !== null && list[selectedIdx] !== undefined;

  useEffect(() => {
    setKeyword(initialKeyword ?? '');
  }, [initialKeyword]);

  const selected = useMemo(
    () => (hasSelection ? list[selectedIdx as number] : undefined),
    [hasSelection, list, selectedIdx],
  );

  const runSearch = async (kw: string) => {
    if (!kw.trim()) return;
    setLoading(true);
    try {
      const items = await searchKeyword(kw.trim(), apiKey);
      setList(items);
      setSelectedIdx(items.length ? 0 : null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    runSearch(keyword);
  };

  const handleUseCurrent = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const addr = await reverseGeocode(lat, lng, apiKey);
          onSelect({
            displayName: addr.road || addr.jibun || '현재 위치',
            roadAddress: addr.road,
            jibunAddress: addr.jibun,
            lat,
            lng,
          });
          onClose();
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const confirmSelection = () => {
    if (!selected) return;
    onSelect({
      displayName:
        selected.road_address_name ||
        selected.address_name ||
        selected.place_name ||
        '',
      roadAddress: selected.road_address_name,
      jibunAddress: selected.address_name,
      lat: selected.y ? Number(selected.y) : undefined,
      lng: selected.x ? Number(selected.x) : undefined,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <S.Overlay>
      <S.Panel>
        <S.Header>
          <img src={back} alt="뒤로가기" onClick={onClose} />
        </S.Header>
        <S.Title>주소를 선택해주세요.</S.Title>
        <S.SearchBar onSubmit={handleSubmit}>
          <S.SearchInput
            placeholder="도로명, 건물명, 지번 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <S.SearchIcon src={searchIcon} alt="검색" />
        </S.SearchBar>
        <S.CurrentLocationBtn onClick={handleUseCurrent}>
          현재 위치로 설정
        </S.CurrentLocationBtn>
        <S.List>
          {!loading &&
            list.map((it, idx) => (
              <S.Item
                key={`${it.id}-${idx}`}
                selected={idx === selectedIdx}
                onClick={() => setSelectedIdx(idx)}
              >
                <div className="name">
                  {it.place_name || it.road_address_name || it.address_name}
                </div>
                <div className="road">
                  {it.road_address_name || it.address_name}
                </div>
              </S.Item>
            ))}
        </S.List>
        <S.Button disabled={!hasSelection} onClick={confirmSelection}>
          이 주소로 등록하기
        </S.Button>
      </S.Panel>
    </S.Overlay>
  );
}
