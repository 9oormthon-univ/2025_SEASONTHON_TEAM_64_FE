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
  margin-top: 12.1rem;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  gap: 1.1rem;
  margin-top: auto;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 1.7rem 8.9rem;
  border-radius: 0.8rem;
  background: #ff6a25;

  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.036rem;

  cursor: pointer;
`;

export const MaruSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 19rem;
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
