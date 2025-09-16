import styled from '@emotion/styled';

export const Mission = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: calc(100% - 2rem);
  padding: 1.8rem 1.4rem;

  align-items: center;
  justify-content: space-between;

  color: #2b2c2f;
  text-align: center;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;

  border-radius: 0.8rem;
  box-shadow: 0 1px 7.6px 0 rgba(0, 0, 0, 0.1);

  img {
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const MenuBox = styled.div`
  position: absolute;
  z-index: 10;

  display: flex;
  flex-direction: column;

  right: -1.8rem;
  top: 5rem;

  border-radius: 0.5rem;
  background: #fbfbfb;
`;

export const MenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #ededed;
`;

export const MenuItem = styled.div`
  display: flex;
  padding: 1rem 1.8rem;

  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.orange400};
  text-align: center;
  ${({ theme }) => theme.fonts.light};
  font-size: 1.2rem;
`;

export const ModalContainer = styled.div`
  position: absolute;
  z-index: 20;
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

export const DeletePopUp = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 7.4rem);
  aspect-ratio: 31.9 / 13.7;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.basic.white};
  border: 1px solid ${({ theme }) => theme.colors.primary.orange400};
  border-radius: 2rem;

  gap: 0.3rem;
  padding-top: 2.8rem;
`;

export const DeleteText = styled.div`
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.8rem;
  color: #2b2c2f;
  text-align: center;
`;

export const DeleteButtonBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  justify-content: center;
  align-items: center;
  padding: 1.7rem 0;
  margin-top: auto;
`;

export const DeleteButton = styled.div<{ isCancel?: boolean }>`
  display: flex;
  flex-direction: row;

  width: 50%;

  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.fonts.medium};
  color: ${({ isCancel, theme }) =>
    isCancel ? theme.colors.basic.dark_gray : theme.colors.primary.orange400};
  font-size: 1.6rem;
`;
