import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  padding: 2rem 2rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.basic.white};
  box-shadow: 0 0 4px 0 rgba(210, 210, 210, 0.3);
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const Nick = styled.div`
  ${({ theme }) => theme.fonts.bold};
  color: #2b2c2f;
  font-size: 1.6rem;
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 32.5 / 18.9;
  object-fit: fill;
  border-radius: 2rem;
  margin-bottom: 1.3rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 0 0.5rem;
`;

export const LikeBtn = styled.img`
  width: 2.2rem;
  height: 2rem;
  display: inline-block;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  cursor: pointer;
  vertical-align: middle;

  &[data-animating='true'] {
    transform: scale(2);
  }
`;

export const CommentBtn = styled.img`
  width: 6.2rem;
  height: 2.3rem;
  cursor: pointer;
`;

export const Time = styled.span`
  margin-left: auto;
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.basic.gray};
`;

export const Desc = styled.div`
  ${({ theme }) => theme.fonts.medium};
  color: #2b2c2f;
  font-size: 1.4rem;
  margin: 1.8rem 0;
`;

export const MenuIcon = styled.img`
  margin-left: auto;
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

export const VerticalDivider = styled.div`
  width: 2px;
  height: 2rem;

  background: #cbcbcb;
`;
