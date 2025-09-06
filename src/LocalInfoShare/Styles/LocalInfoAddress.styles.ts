import styled from "styled-components";

/* 상단 타이틀 */
export const ScreenTitle = styled.h2`
  margin: 8px 16px 12px;
  font-size: 18px;
  font-weight: 800;
  color: #222;
`;

/* 검색 필드 래퍼 (아이콘 버튼을 입력 박스 안 오른쪽에) */
export const SearchField = styled.div`
  position: relative;
  margin: 6px 16px 6px;
`;

/* 입력창: 둥근 알약 + 주황 테두리 + 살짝 그림자 */
export const SearchInput = styled.input`
  width: 80%;
  height: 46px;
  border-radius: 9999px;
  border: 2px solid #ff6a00;
  background: #fff;
  padding: 0 48px 0 16px; /* 오른쪽 아이콘 여백 */
  font-size: 14px;
  outline: none;

  box-shadow: 0 6px 14px rgba(255, 106, 0, 0.12);

  &::placeholder {
    color: #7a7a7a;
  }
`;

/* 우측 원형 검색 아이콘 버튼 */
export const SearchIconBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border: none;
  width: 32px;
  height: 32px;
  background: #fff;
  color: #ff6a00;         /* lucide 아이콘 컬러 */
  display: grid;
  place-items: center;
  cursor: pointer;

`;

/* 현재 위치: 파란 링크 스타일, 오른쪽 정렬 */
export const CurrentLocationBtn = styled.button`
  margin: 2px 16px 0;
  padding: 0;
  height: 28px;

  border: none;
  background: transparent;
  color: #2b6cff;
  font-size: 12px;
  font-weight: 700;

  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  /* 오른쪽 정렬 */
  float: right;
`;

/* 하단 확정 버튼 영역 */
export const ConfirmRow = styled.div`
  margin-top: auto;
  padding: 16px;
`;

/* 큰 주황 CTA 버튼 */
export const ConfirmButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 10px;
  border: none;
  background: #ff6a00;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;

  box-shadow: 0 12px 24px rgba(255,106,0,0.28), 0 6px 12px rgba(255,106,0,0.18);

  &:active {
    transform: translateY(1px);
    box-shadow: 0 8px 18px rgba(255,106,0,0.25), 0 4px 10px rgba(255,106,0,0.16);
  }
`;
