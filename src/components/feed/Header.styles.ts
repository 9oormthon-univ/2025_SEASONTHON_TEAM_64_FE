import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 4rem);
  display: flex;
  flex-direction: row;
  margin-top: 6rem;
  justify-content: space-between;
`;

export const Back = styled.img`
  width: 1rem;
  height: 2rem;
  flex-shrink: 0;
  aspect-ratio: 1/2;
  cursor: pointer;
`;

export const Title = styled.div`
  color: #fff;
  ${({ theme }) => theme.fonts.bold}
  font-size: 2rem;
  position: absolute;
  left: 42%;
`;
