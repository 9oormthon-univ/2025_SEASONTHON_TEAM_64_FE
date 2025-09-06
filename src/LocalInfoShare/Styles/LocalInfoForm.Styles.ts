import styled from "styled-components";
import { Circle, Triangle, Square } from "lucide-react";

/* =========================
   공용 레이아웃 (그대로 유지)
   ========================= */
export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  position: relative;
`;

/* =========================
   (레거시) 입력 요소 - 호환 유지용
   ========================= */
export const TitleInput = styled.input`
  width: 310px;
  height: 54px;
  margin: 0 auto 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 2px solid #000;
  &::placeholder { color:#000; font-weight:700; }
`;

export const DetailBox = styled.div`
  position: relative;
  width: 311px;
  height: 178px;
  margin: 0 auto 20px;
`;

export const DetailInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 16px 48px 24px 20px;
  font-size: 16px;
  border: 2px solid #bdbdbd;
  background-color: rgba(249,249,249,0.49);
  border-radius: 20px;
  resize: none;
  box-sizing: border-box;
  &::placeholder { color:#000; font-size:16px; }
`;

export const CharCounter = styled.div`
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-size: 12px;
  color: #555;
  pointer-events: none;
`;

export const AddressBox = styled.div<{ $isEmpty: boolean }>`
  width: 267px;
  margin: 0 auto 20px;
  height: 11px;
  border-radius: 30px;
  border: 2px solid #191919;
  padding: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: #fff;
  color: ${({ $isEmpty }) => ($isEmpty ? "#7a7a7a" : "#111")};
  font-size: 1rem;

  &:focus {
    outline: 3px solid #a3c5ff;
    outline-offset: 2px;
  }
`;

export const AddressInput = styled.input`
  width: 310px;
  margin: 0 auto 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 2px solid #000;
  &::placeholder { color:#000; font-weight:700; }
`;

/* =========================
   (예전) 종류 선택 - 현재는 미사용
   ========================= */
export const ContentArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

export const ContentBox = styled.div`
  display: flex; align-items:center; justify-content:center;
  width: 100px; height: 50px;
`;

export const TypeArea = styled.div`
  width: 100%;
  height: 120px;
  display: none; /* ← 기존 도형 UI는 숨김 처리 */
  justify-content: center;
  gap: 30px;
`;

export const TypeButton = styled.button`
  width: 80px; height: 60px;
  border: 2px solid rgba(207,185,185,0.49);
  background: none;
  border-radius: 20px;
  display: grid; place-items: center;
  cursor: pointer;
`;

export interface ActiveProp { $active: boolean; }

export const UserCircle = styled(Circle)<ActiveProp>`
  width: 40px; height: 40px;
  fill: rgba(30,255,0,0.86);
  stroke: ${({ $active }) => ($active ? "red" : "none")};
`;

export const UserTriangle = styled(Triangle)<ActiveProp>`
  width: 40px; height: 40px;
  fill: blue;
  stroke: ${({ $active }) => ($active ? "red" : "none")};
`;

export const UserSquare = styled(Square)<ActiveProp>`
  width: 40px; height: 40px;
  fill: rgba(255,115,0,0.86);
  stroke: ${({ $active }) => ($active ? "red" : "none")};
`;

/* 하단 버튼/모달 */
export const AddInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

/* =========================
   (신규) 내부 카드 UI
   ========================= */
export const Card = styled.div`
  width: 335px;
  margin: 4px auto 12px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
`;

export const CardHeaderBar = styled.div`
  width: 100%;
  min-height: 52px;
  background: #ff6a00;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
`;

export const HeaderLabel = styled.div`
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  white-space: nowrap;
`;

export const HeaderTitleInput = styled.input`
  border: none;
  font-size: 15px;
  outline: none;
  background: none;
`;

export const CardBody = styled.div`
  padding: 12px 14px 16px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const BodyTextarea = styled.textarea`
  width: 100%;
  height: 140px;
  border: none;
  resize: none;
  font-size: 14px;
  line-height: 1.4;
  outline: none;

  &::placeholder{
    color: #bdbdbd;
  }
`;

export const BodyCounter = styled.div`
  position: absolute;
  right: 22px;
  bottom: 16px;
  font-size: 12px;
  color: #9a9a9a;
  pointer-events: none;
`;

/* 버튼 두 개 */
export const ButtonRow = styled.div`
  width: 100%;
  max-width: 335px;
  margin: 8px auto 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const GhostButton = styled.button`
  height: 48px;
  border-radius: 12px;
  border: 1.5px solid #efefef;
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  display: grid;
  place-items: center;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  cursor: pointer;
`;

export const GhostSub = styled.span`
  position: absolute;
  bottom: 6px;
  font-size: 10px;
  color: #a0a0a0;
`;

/* 섹션 타이틀 (“종류”) */
export const SectionTitle = styled.div`
  max-width: 335px;
  margin: 0 auto 8px;
  font-size: 15px;
  font-weight: 700;
  color: #222;
`;

/* ===== 새 종류 섹션 ===== */
export const CategoryArea = styled.div`
  width: 100%;
  max-width: 335px;
  margin: 0 auto 16px;
`;

export const CategoryIconsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  margin: 8px 0 6px;
`;

export const CatIconImg = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
`;

export const CategoryButtonsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const CategoryButton = styled.button<{ $active?: boolean }>`
  height: 34px;
  border-radius: 18px;
  border: 1px solid ${({ $active }) => ($active ? "transparent" : "#e9e9e9")};
  background: ${({ $active }) => ($active ? "#ff6a00" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  cursor: pointer;
`;

/* 하단 등록 버튼 바 */
export const RegisterBar = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 8px 20px 16px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const RegisterButton = styled.button`
  width: 100%;
  height: 50px;
  background: #ff6a00;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;


`;

/* 숨김 파일 인풋 */
export const HiddenFileInput = styled.input`
  display: none;
`;
