import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background: rgba(101, 101, 101, 0.4);
`;

export const Popup = styled.div`
  display: flex;

  width: calc(100% - 7.4rem);
  padding: 2.4rem 5.1rem;

  border-radius: 2rem;
  border: 1px solid #ff6a25;
  background: rgba(255, 255, 255, 0.8);

  color: #2b2c2f;
  text-align: center;

  ${({ theme }) => theme.fonts.bold};
  font-size: 1.8rem;

  align-items: center;
  justify-content: center;
`;
