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
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
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
