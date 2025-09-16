import styled from '@emotion/styled';

export const Background = styled.div`
  position: absolute;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(22, 22, 22, 0.8);
`;

export const Text = styled.div`
  ${({ theme }) => theme.fonts.bold}
  color: #fff;
  font-size: 2.4rem;
`;

export const Video = styled.video`
  margin-top: 4.5rem;
  width: 53.8rem;
  height: 39.15rem;
  flex-shrink: 0;
`;
