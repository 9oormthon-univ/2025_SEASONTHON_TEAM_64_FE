import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  height: 100vh;

  overflow: hidden;
`;

export const ServiceName = styled.div`
  margin-top: 25.7rem;
`;

export const ServiceDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1.8rem;
`;

export const ServiceDescription = styled.div`
  color: #2b2c2f;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
`;

export const LoginButton = styled.div`
  margin-top: auto;
`;

export const MaruSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 19rem;

  margin-top: auto;
`;

export const FrontMaru = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  flex-shrink: 0;
`;

export const RightMaru = styled.img`
  position: absolute;
  right: -3rem;
  bottom: -2rem;
  transform: rotate(11.646deg);
  flex-shrink: 0;
`;
