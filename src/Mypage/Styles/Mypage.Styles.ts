import styled from "styled-components";
import { User } from "lucide-react";

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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
`;

export const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 302px;
  height: 168px;
  background-color: #eee;
  border: 1px solid #000;
  margin: 0 auto;
  border-radius: 15px;
  padding: 16px 20px;
  box-sizing: border-box;
`;

export const IconBox = styled.div`
  width: 94px;
  height: 98px;
  border-radius: 20px;
  background-color: #d2d0d0;
  border: 2px solid #000;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const UserIcon = styled(User)`
  width: 70px;
  height: 70px;
  stroke: #000;
`;

export const NameText = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 6px;
  white-space: nowrap;
`;

export const UpdateText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 8px;
  color: #333;
`;

export const CenterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-top: 20px;
  gap: 20px;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const CardButton = styled.button`
  width: 140px;
  height: 135px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
`;

export const FortuneCookieButton = styled.button`
  width: 295px;
  height: 225px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 15px;
  display: block;
  margin: 20px auto 0;
  font-size: 1rem;
  cursor: pointer;
`;
