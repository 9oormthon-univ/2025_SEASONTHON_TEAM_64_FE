import styled from "styled-components";

export const Card = styled.div`
  width: 245px;
  height: 240px;
  background-color: #f5f5f5;
  border-radius: 24px;
  border: 2px solid black;
  margin: 0 auto 20px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconBox = styled.div`
  display: flex; justify-content:center; align-items:center;
  width: 45px; height: 45px;
  background-color: #bbb;
  border-radius: 25px;
  border: 1px solid #000;
`;

export const AdminLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

export const Inner = styled.div`
  position: relative;
  width: 244px;
  height: 144px;
  background-color: #cfd4da;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none; outline: none; resize: none;
  background: transparent;
  padding: 16px;
  font-size: 16px; font-weight: 600; color: #444;
  text-align: center;
  &::placeholder { color: transparent; }
`;

export const FakePlaceholder = styled.div`
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  color: #666; font-size: 16px; font-weight: 600;
`;

export const Counter = styled.div`
  position: absolute; right: 12px; bottom: 8px;
  font-size: 12px; color: #4a4a4a;
`;

export const ButtonRow = styled.div`
  display: flex; justify-content: center; align-items: center;
  width: 245px; height: 60px; margin: 20px auto 0;
`;
