import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
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
  background: #f5f5f5;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0 2rem;
  margin-top: 6.4rem;

  .title {
    ${({ theme }) => theme.fonts.bold};
    font-size: 2rem;
    color: #2b2c2f;
    flex: 1;
    text-align: center;
    transform: translateX(-1.6rem);
  }

  img {
    cursor: pointer;
  }
`;

export const MapArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  margin-top: 2.4rem;
  width: 100%;
  flex: 1;
`;

export const InfoCard = styled.div`
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: 14rem;
  z-index: 2;
  padding: 2rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);

  .name {
    ${({ theme }) => theme.fonts.bold};
    font-size: 1.8rem;
    color: #2b2c2f;
  }
  .addr {
    margin-top: 0.8rem;
    color: #555;
    font-size: 1.3rem;
  }
  .chip {
    margin-top: 1.2rem;
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    border-radius: 999rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
  }
`;
