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

export const Text = styled.div`
  ${({ theme }) => theme.fonts.bold};
  margin-top: auto;
  color: #000;
  text-align: center;
  font-size: 2.4rem;
  line-height: 2.8rem;

  span {
    ${({ theme }) => theme.fonts.bold};
    color: #ff6a25;
    font-size: 2.4rem;
  }
`;

export const Image = styled.img`
  flex-shrink: 0;
  width: 22rem;
  margin-top: 7rem;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  margin: auto 0;

  width: calc(100% - 4rem);
  padding: 1.7rem 8.9rem;

  border-radius: 0.8rem;
  background: #ff6a25;
  border: none;

  color: #fff;
  ${({ theme }) => theme.fonts.bold}
  font-size: 1.8rem;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
