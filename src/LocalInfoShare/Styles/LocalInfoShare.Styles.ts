import styled from "styled-components";

/* ===== 레이아웃 ===== */
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
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.05);
  border-radius: 50px;
  /* 페이지 전체는 스크롤 금지 */
  overflow: hidden;
`;

/* ===== 상단 "최신순 + 필터" ===== */
export const UpdateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 10px;
`;

export const UpdateList = styled.div`
  font-size: .875rem;
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
  padding: 8px 12px;
  border-radius: 9999px;
  border: 1px solid ${({ $active }) => ($active ? "#e3c7d7" : "#e5e5e5")};
  background: ${({ $active }) => ($active ? PLUM_ULTRA_LIGHT : "#f4f4f4")};
  color: #333;
  font-size: .85rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease;

  &:focus {
    outline: 3px solid #a3c5ff;
    outline-offset: 2px;
  }
`;

/* ===== 카드 리스트 스크롤 박스 ===== */
export const ListViewport = styled.div`
  flex: 1 1 auto;
  min-height: 0;                 /* flex 컨테이너에서 스크롤 위해 필요 */
  overflow-y: auto;              /* 이 박스만 스크롤 */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 4px 0 84px;           /* 하단 버튼/탭바와 겹치지 않게 여유 */
`;

export const Sentinel = styled.div`
  height: 1px;
`;

export const LoadingRow = styled.div`
  text-align: center;
  color: #777;
  padding: 8px 0 16px;
`;

/* ===== 카드 ===== */
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
  border-radius: 20px;
  background-color: #d2d0d0;
  border: 2px solid #000;
  display: grid;
  place-items: center;
`;

export const TextColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 19px 20px 0;

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
  padding: 0;
  line-height: 0;
`;

export const TagBox = styled.div`
  padding: 4px 10px;
  border-radius: 6px;
  color: #fff;
  font-size: .75rem;
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

export const EmptyBox = styled.div`
  margin: 24px 16px 8px;
  padding: 14px 12px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px dashed #e3e3e3;
  color: #888;
  font-size: .9rem;
`;

/* ===== 모달 ===== */
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.25);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: min(92vw, 360px);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  overflow: hidden;
  border: 1px solid #e6e6e6;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: #f3f3f3;
  border-bottom: 1px solid #e9e9e9;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AvatarCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid #222;
  display: grid;
  place-items: center;
`;

export const HeaderAuthor = styled.span`
  font-weight: 700;
  color: #333;
`;

export const ModalCloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

export const ModalBody = styled.div`
  padding: 14px;
`;

export const ModalFooter = styled.div`
  height: 10px;
`;

export const ModalSection = styled.div`
  width: 100%;
  min-height: 58px;
  border-radius: 12px;
  border: 1.5px solid #191919;
  background: #e8eef5;
  margin: 10px 0;
  padding: 12px;
  display: flex;
  align-items: center;
`;

export const ModalPill = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  border: 1.5px solid #191919;
  background: #f3f6fb;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.2px;
`;

export const ModalText = styled.div`
  font-size: .95rem;
  color: #333;
  line-height: 1.5;
  word-break: break-word;
`;

export const ModalImagePlaceholder = styled.div`
  width: 100%;
  text-align: center;
  color: #666;
`;

export const ModalBadge = styled.div`
  display: inline-block;
  margin-right: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  color: #fff;
  font-size: .75rem;
  font-weight: 800;
  line-height: 1;
`;

export const ModalMetaRow = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-child {
    font-size: .75rem;
    color: #777;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const AddressBtn = styled.button`
  font-size: .8rem;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: #f6f6f6;
  cursor: pointer;

  &:hover {
    background: #efefef;
  }
`;
