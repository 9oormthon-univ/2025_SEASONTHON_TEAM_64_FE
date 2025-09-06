import styled from "styled-components";

/* 공통 색상 */
const ORANGE_START = "#FF6A25";
const ORANGE_END   = "#FFA263";
const GRAY_TEXT    = "#6B7280";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #f4f5f6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 480px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  overflow: hidden;
`;

/* 내부 본문 영역(헤더/바 사이) */
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 16px 20px;
  box-sizing: border-box;
  flex: 1 1 auto;
`;

/* ===== 프로필 카드 ===== */
export const ProfileCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  background: none;
`;

/* 아바타 박스: 기준 + 원형 클리핑 */
export const AvatarBox = styled.div`
  position: relative;    /* ← 배지 absolute 기준 */
  width: 105px;
  height: 105px;
  border-radius: 50%;
  overflow: hidden;      /* 이미지 삐져나옴 방지 */
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

/* 아바타 우하단 동그라미 배지(빈 원형 박스) */
export const AvatarBadge = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18);
`;

/* 프로필 텍스트 */
export const ProfileTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Nickname = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

export const Subnote = styled.div`
  white-space: pre-line;
  line-height: 1.3;
  font-size: 12px;
  color: ${GRAY_TEXT};
`;

/* ===== 오렌지 카드 2개 ===== */
export const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const ActionCard = styled.button`
  position: relative;
  flex: 1 1 0;
  min-height: 84px;
  border: 0;
  border-radius: 14px;
  padding: 10px 12px;
  text-align: left;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(90deg, ${ORANGE_START} 0%, ${ORANGE_END} 100%);
  box-shadow: 0 8px 20px rgba(255,106,37,0.25);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ActionCaption = styled.div`
  font-size: 11px;
  opacity: 0.9;
`;

export const ActionTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
`;

export const ActionRight = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: rgba(255,255,255,0.95);
`;

/* ===== 정보 패널(크림색 큰 박스) ===== */
export const InfoPanel = styled.div`
  background: #fffaf2;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoBadge = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #cfd2d6;
  display: grid;
  place-items: center;
  color: #222;
  font-weight: 700;
  font-size: 14px;
`;

/* 제목과 조회 버튼 한 줄 */
export const InfoHeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const InfoTitle = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #111827;
`;

export const InfoDesc = styled.div`
  white-space: pre-line;
  color: ${GRAY_TEXT};
  font-size: 12px;
  line-height: 1.4;
`;

export const PillButton = styled.button`
  background: #f3f4f6;
  border: 0;
  border-radius: 999px;
  font-size: 12px;
  padding: 8px 12px;
  color: #111827;
  cursor: pointer;
  white-space: nowrap;

  &:hover { filter: brightness(0.98); }
`;
