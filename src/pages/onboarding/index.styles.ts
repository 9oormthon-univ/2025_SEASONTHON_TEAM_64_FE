import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  height: 100vh;

  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.primary.orange400} 0%,
    ${({ theme }) => theme.colors.primary.orange200} 100%
  );
`;

export const Logo = styled.img`
  width: calc(100% - 22.4rem);
  margin-top: auto;
  aspect-ratio: 16.9 / 3.9;
`;

export const OnBoardingMaru = styled.img`
  margin-top: auto;
  width: 100%;
`;
