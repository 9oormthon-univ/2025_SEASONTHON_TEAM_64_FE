import styled from "styled-components";

/* 레이아웃 */
export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

/** 상단 "최신순 + 필터버튼들" 한 줄 */
export const UpdateRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin: 0 12px 10px 12px;
`;

export const UpdateList = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #777;
  margin-right: 10px;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 6px;
  margin-right: 25px;
`;

const PLUM_ULTRA_LIGHT = "#F8EAF2";

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 6px 10px;
  border-radius: 9999px;
  border: 1px solid ${({ $active }) => ($active ? "#e3c7d7" : "#e5e5e5")};
  background: ${({ $active }) => ($active ? PLUM_ULTRA_LIGHT : "#f4f4f4")};
  color: #333;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
`;

/* 카드/리스트 */
export const Card = styled.div`
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  margin: 8px 16px;
  padding: 10px;
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
`;

export const RightColumn = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const TagBox = styled.div`
  padding: 4px 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1;
`;

export const AddInfoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;

export const EmptyBox = styled.div`
  margin: 24px 16px 8px;
  padding: 14px 12px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px dashed #e3e3e3;
  color: #888;
  font-size: 0.9rem;
`;
