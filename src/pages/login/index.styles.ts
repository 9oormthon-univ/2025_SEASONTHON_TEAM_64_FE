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
  margin-top: auto;
`;

export const ServiceDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1.8rem;
`;

export const ServiceDescription = styled.div`
  ${({ theme }) => theme.fonts.bold}
  color: #2b2c2f;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
`;

export const LoginButton = styled.div`
  margin: auto 0;
`;

export const MaruSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  margin-top: auto;
`;

export const FrontMaru = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 55%;
  height: auto;
  aspect-ratio: 20 / 18;
`;

export const RightMaru = styled.img`
  position: absolute;
  right: 0.2rem;
  bottom: 0rem;
  width: 60%;
  height: auto;
  aspect-ratio: 22 / 19;
`;
