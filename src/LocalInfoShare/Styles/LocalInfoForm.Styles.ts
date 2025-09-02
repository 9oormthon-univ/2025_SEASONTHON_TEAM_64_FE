import styled from "styled-components";
import { Circle, Triangle, Square } from "lucide-react";

/* 레이아웃 */
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
  border-radius: 50px;
  position: relative;
`;

/* 입력 */
export const TitleInput = styled.input`
  width: 310px;
  margin: 0 auto 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 2px solid #000;
  &::placeholder { color:#000; font-weight:700; }
`;

/* 내용 입력 박스(카운터 오버레이용 래퍼) */
export const DetailBox = styled.div`
  position: relative;
  width: 311px;
  height: 178px;
  margin: 0 auto 20px;
`;

export const DetailInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 16px 48px 24px 20px; /* 카운터 공간 */
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

/* 종류 선택 */
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
  display: flex;
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
