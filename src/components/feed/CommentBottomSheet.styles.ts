import styled from '@emotion/styled';

export const Overlay = styled.div<{
  isMounted: boolean;
  isClosing: boolean;
}>`
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: ${({ isMounted, isClosing }) => (isClosing ? 0 : isMounted ? 1 : 0)};
  transition: opacity 0.28s ease;
`;

export const Sheet = styled.div<{
  translateY: number;
  isDragging: boolean;
  isClosing: boolean;
  extraHeight: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  height: calc(55vh + ${({ extraHeight }) => extraHeight}px);
  padding: 0rem 2rem 1.8rem 2rem;

  border-radius: 3rem 3rem 0 0;
  background: #fff;
  box-shadow: 0 -2px 10.6px 0 rgba(210, 210, 210, 0.3);

  transform: translateY(${({ translateY }) => translateY}px);
  transition: ${({ isDragging, isClosing }) =>
    isDragging
      ? 'none'
      : isClosing
        ? 'transform 0.24s cubic-bezier(.4,.0,.2,1)'
        : 'transform 0.34s cubic-bezier(.22,.8,.36,1)'};
  touch-action: none;
`;

export const Handle = styled.div`
  width: 5rem;
  height: 0.4rem;

  border-radius: 999px;
  background: #c5c5c5;
  margin: 2rem auto;
`;

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  gap: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  position: relative;
`;

export const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f3f3;
`;

export const CommentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const Nickname = styled.span`
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.3rem;
  color: #2b2c2f;
`;

export const Time = styled.span`
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.1rem;
  color: #8a8a8a;
`;

export const MenuButton = styled.img`
  cursor: pointer;
`;

export const Description = styled.p`
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.4rem;
  color: #2b2c2f;
  line-height: 1.4;
  white-space: pre-wrap;
`;

export const InputBar = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  width: 100%;
  margin: 0 auto;
  align-items: center;
  padding: 1.7rem 2rem;

  background: #ededed;
  gap: 1rem;
  z-index: 1001;
`;

export const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  min-height: 4.8rem;
  max-height: 14rem;
  padding: 1.2rem 2rem;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 0 0 4px 1px rgba(197, 197, 197, 0.5) inset;
  line-height: 1.4;
  font-size: 1.4rem;
  ${({ theme }) => theme.fonts.medium};
  border: none;

  &:focus {
    outline: none;
  }

  resize: none;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const SubmitBtn = styled.button`
  width: 2.7rem;
  height: 2.7rem;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    opacity: 0.7;
  }
`;

export const MenuBox = styled.div`
  position: absolute;
  z-index: 10;

  display: flex;
  flex-direction: column;

  right: -1.8rem;
  top: 3rem;

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
