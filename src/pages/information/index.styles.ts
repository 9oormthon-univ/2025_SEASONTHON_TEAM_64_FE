import styled from '@emotion/styled';

export const CreateIcon = styled.img`
  position: absolute;
  right: 2rem;
  bottom: 10rem;
  aspect-ratio: 1/1;
  flex-shrink: 0;
  cursor: pointer;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  padding-bottom: 12rem;

  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  align-items: center;

  justify-content: flex-end;
  padding: 0 2rem;
  margin-top: 6.5rem;

  img {
    cursor: pointer;
  }
`;

export const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  margin-top: 1.2rem;
  padding: 0 2rem;
  align-items: center;
  gap: 3rem;

  ${({ theme }) => theme.fonts.heavy};
  color: #2b2c2f;
  text-align: center;
  font-size: 1.4rem;
`;

export const Category = styled.div<{ selected: boolean }>`
  padding-bottom: 1.4rem;

  border-bottom: ${(props) =>
    props.selected ? '0.3rem solid #FF6A25;' : '0.3rem solid #FFF'};
`;
