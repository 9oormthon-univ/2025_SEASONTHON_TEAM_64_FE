import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3.1rem;
  width: calc(100% - 4rem);
  height: 8.5rem;
  padding: 2rem 3.4rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 2rem;
  background: linear-gradient(
    180deg,
    #fff 77.4%,
    rgba(255, 255, 255, 0.7) 100%
  );
`;

export const Title = styled.div`
  color: #3d8aff;
  ${({ theme }) => theme.fonts.bold}
  font-size: 1.4rem;
`;

export const Content = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.bold}
  font-size: 1.8rem;
`;
