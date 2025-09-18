import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;

  justify-content: center;
  align-items: flex-start;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  height: 100vh;

  align-items: center;
  background: #f5f5f5;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;

  margin-top: 6.5rem;
  align-items: center;

  padding: 0 2rem;

  img {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  width: 100%;
  color: #2b2c2f;
  font-size: 2rem;
  font-weight: 700;
  margin: 4.9rem 0;
  padding: 0 2rem;
`;

export const SearchBar = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
`;

export const SearchInput = styled.input`
  display: flex;
  flex: 1;

  padding: 1.5rem 2.3rem;
  border-radius: 5rem;
  border: 1px solid #ff8a54;
  background: #fff;

  color: #2b2c2f;
  font-size: 1.4rem;
  font-weight: 700;

  &::placeholder {
    color: #2b2c2f;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

export const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2.3rem;
  cursor: pointer;
`;

export const CurrentLocationBtn = styled.div`
  display: flex;
  justify-content: flex-end;

  width: calc(100% - 4rem);
  margin-top: 2.5rem;

  color: #2a7eff;
  font-size: 1.2rem;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-underline-position: from-font;

  cursor: pointer;
`;

export const List = styled.ul`
  width: 100%;

  margin: 2rem 0;
  padding: 0 2rem;

  list-style: none;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.li<{ selected: boolean }>`
  padding: 1.8rem 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  color: #2b2c2f;
  background: ${({ selected }) => (selected ? '#FFF6E7' : 'transparent')};

  .name {
    ${({ theme }) => theme.fonts.bold};
    font-size: 1.5rem;
  }
  .road {
    margin-top: 0.2rem;
    font-size: 1.3rem;
    color: #8b8b8b;
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  width: calc(100% - 4rem);
  padding: 1.7rem 0rem;

  border-radius: 0.8rem;
  background: #ff6a25;
  border: none;

  margin: 2rem 0 5rem 0;

  color: #fff;
  ${({ theme }) => theme.fonts.bold}
  font-size: 1.8rem;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
