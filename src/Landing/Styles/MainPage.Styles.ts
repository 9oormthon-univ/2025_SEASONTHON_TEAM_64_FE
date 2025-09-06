import styled from "styled-components";

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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
`;

export const LogoBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #bbb;
  border-radius: 85px;
  display: grid;
  place-items: center;
  font-size: 18px;
`;

export const MainText = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 18px 0 20px;
  text-align: center;
`;

export const KakaoLoginBtn = styled.button`
  width: 338px;
  height: 56px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 2px solid #222;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

export const LoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 201px;
  height: 49px;
  background: yellow;
  border: none;
`;
export const LoginText = styled.span`
  font-size: 15px;
  margin: 20px;
  `;