import styled from "styled-components";

/* 상단 검색바 */
export const SearchBar = styled.div`
  margin: 10px 16px 0;
  display: grid;
  grid-template-columns: 1fr 44px;
  gap: 8px;
`;

export const AddressInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 14px;
  border: 2px solid #191919;
  padding: 0 14px;
  font-size: 1rem;
  outline: none;
  background: #fff;

  &::placeholder {
    color: #777;
  }
`;

export const SearchIconBtn = styled.button`
  width: 44px;
  height: 48px;
  border-radius: 14px;
  border: 2px solid #191919;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

/* 현재 위치 버튼 */
export const CurrentLocationBtn = styled.button`
  margin: -5px 16px 0;
  height: 44px;
  border:none;
  background: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

/* 지도 컨테이너(옵션) */
export const MapBox = styled.div`
  margin: 12px 16px 0;
  height: 220px;
  border-radius: 14px;
  border: 1px solid #eee;
  background: #fafafa;
`;

/* 하단 확인 버튼 영역 */
export const ConfirmRow = styled.div`
  padding: 12px 16px 0;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background: #111;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;
