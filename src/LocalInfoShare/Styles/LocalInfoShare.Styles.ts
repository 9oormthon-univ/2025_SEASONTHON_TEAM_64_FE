// src/LocalInfoShare/Styles/LocalInfoShare.Styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 480px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.05);
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom);
`;

export const UpdateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 10px;
`;

export const UpdateList = styled.div`
  font-size: .9rem;
  font-weight: 600;
  color: #777;
  margin-right: 8px;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 6px;
  margin-left: 4px;
`;

const PLUM_ULTRA_LIGHT = "#F8EAF2";

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 10px;
  border-radius: 9999px;
  border: 1px solid ${({ $active }) => ($active ? "#e3c7d7" : "#e5e5e5")};
  background: ${({ $active }) => ($active ? PLUM_ULTRA_LIGHT : "#f4f4f4")};
  color: #333;
  font-size: .9rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease;

  &:focus {
    outline: 3px solid #a3c5ff;
    outline-offset: 2px;
  }
`;

export const ListViewport = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 4px 0 90px;
`;

export const EmptyBox = styled.div`
  margin: 24px 16px 8px;
  padding: 14px 12px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px dashed #e3e3e3;
  color: #888;
  font-size: .95rem;
`;

export const Card = styled.div`
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  margin: 8px 16px;
  padding: 12px;
  background: #fff;
`;

export const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconBox = styled.div`
  flex: 0 0 70px;
  height: 70px;
  border-radius: 18px;
  overflow: hidden;
  background: #fafafa;
  border: 1px solid #e7e7e7;
  display: grid;
  place-items: center;
`;

export const ThumbDiv = styled.div<{ $src: string; $fit?: "cover" | "contain" }>`
  width: 100%;
  height: 100%;
  background-image: url("${({ $src }) => $src}");
  background-size: ${({ $fit }) => $fit || "cover"};
  background-position: center center;
  background-repeat: no-repeat;
  transform: translateZ(0);
`;

export const ThumbFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #aaa;
  font-size: 12px;
  border-radius: inherit;
  background: linear-gradient(180deg, #f3f3f3 0%, #e9e9e9 100%);
  border: 1px solid #eee;
`;

export const TextColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 6px 6px 0;

  & > * {
    word-break: break-word;
  }
`;

export const RightColumn = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const IconButtonPlain = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  line-height: 0;
  border-radius: 10px;

  &:active { background: #f3f3f3; }
`;

export const TagBox = styled.div`
  padding: 5px 10px;
  border-radius: 7px;
  color: #fff;
  font-size: .78rem;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1;
`;

export const AddInfoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 6px 20px 14px;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

export const ModalShell = styled.div`
  width: min(92vw, 380px);
  background: #f0f0f0;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  padding: 16px 16px calc(18px + env(safe-area-inset-bottom));
  border: 1px solid #e6e6e6;
`;

export const ModalHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr 36px;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 6px;
`;

export const AvatarCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ff7a00;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 18px;
`;

export const NameCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Nickname = styled.div`
  font-size: 1.05rem;
  font-weight: 800;
  color: #1d1d1d;
  letter-spacing: -0.2px;
`;

export const Handle = styled.div`
  font-size: .85rem;
  color: #999;
`;

export const ModalCloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  justify-self: end;

  &:hover { background: #fafafa; }
`;

/* 오렌지 제목 바 */
export const TitleBar = styled.div`
  background: #ff6a00;
  color: #fff;
  border-radius: 16px 16px 0 0;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TitleLabel = styled.span`
  font-weight: 900;
  font-size: 1.05rem;
`;

export const TitleText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.2px;
`;

/* 하얀 내용 카드 */
export const ContentCard = styled.div`
  background: #fff;
  border-radius: 0 0 16px 16px;
  padding: 16px 16px 22px;
  box-shadow: 0 8px 20px rgba(0,0,0,.12);
`;

export const ContentText = styled.p`
  margin: 0;
  color: #333;
  line-height: 1.55;
  font-size: .98rem;
  min-height: 120px;
`;

export const ContentDate = styled.div`
  text-align: right;
  color: #b5b5b5;
  font-size: .85rem;
  margin-top: 12px;
`;

/* 주소 */
export const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 14px 2px 10px;
`;

export const AddressDot = styled.span`
  font-size: 16px;
`;

export const AddressLink = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 4px 6px;
  margin: -4px -6px;
  color: #0b64d8;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 800;
  font-size: .95rem;
  cursor: pointer;

  &:active { opacity: .85; }
`;

/* 카테고리 큰 배지 */
export const CategoryBadgeLarge = styled.div`
  display: inline-block;
  margin-left: 2px;
  padding: 8px 14px;
  border-radius: 9999px;
  color: #fff;
  font-weight: 900;
  font-size: .9rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
`;
