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
  margin: auto 0;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  gap: 1.1rem;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 1.7rem 8.9rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.primary.orange400};

  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.medium};

  cursor: pointer;
`;

export const MaruSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: auto;
`;

export const FrontMaru = styled.img`
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
