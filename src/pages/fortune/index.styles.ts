import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 95vh;
  background: linear-gradient(180deg, #fafafa 69.95%, #ff6a25 131.69%);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  justify-content: flex-end;
  padding-right: 2rem;
  margin-top: 6.5rem;

  img {
    aspect-ratio: 25/28;
    cursor: pointer;
  }
`;

export const FortuneCookieImage = styled.img`
  width: 17.2rem;
  height: 17.2rem;
  flex-shrink: 0;
`;

export const ButtonImage = styled.img`
  width: calc(100% - 4rem);
  margin: 1rem 0;
  cursor: pointer;
`;
