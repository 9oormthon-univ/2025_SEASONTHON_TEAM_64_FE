import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  align-items: center;

  justify-content: flex-start;
  padding-left: 2rem;
  margin-top: 6.5rem;

  img {
    cursor: pointer;
  }
`;

export const Image = styled.img`
  flex-shrink: 0;
  width: 22rem;
  transform: scale(1.2);
`;

export const FortuneDescription = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 11.6rem);
  max-height: 35rem;
  aspect-ratio: 39.3 / 85.2;

  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.fonts.bold};
  font-size: 2rem;
  line-height: 3rem;
  word-wrap: break-word;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 0 1px 30.3px 0 rgba(0, 0, 0, 0.1);

  margin-top: 2.9rem;
`;
