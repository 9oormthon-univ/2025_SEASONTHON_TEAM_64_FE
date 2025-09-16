import styled from '@emotion/styled';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 0rem 2.2rem;

  align-items: center;
`;

export const HeaderIcon = styled.img`
  width: 1.2rem;
  aspect-ratio: 1.2 / 2.4;
  cursor: pointer;
`;

export const HeaderText = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.8rem;
  margin: 0 auto;
`;
