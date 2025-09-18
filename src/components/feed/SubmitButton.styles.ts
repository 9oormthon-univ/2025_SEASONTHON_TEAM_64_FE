import styled from '@emotion/styled';

export const Button = styled.button`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  margin: 5rem 0;

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
