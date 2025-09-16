import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  padding: 0 2rem;
  ${({ theme }) => theme.fonts.bold};
  color: #2b2c2f;
  font-size: 2.4rem;
  margin-top: 14.3rem;
  margin-bottom: 4.8rem;
`;

export const ModeBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  gap: 1.6rem;

  align-items: center;
`;

export const ModeBox = styled.div<{
  isSelected?: boolean;
  mode?: 'OLD' | 'YOUNG';
}>`
  display: flex;
  flex-direction: column;

  align-items: center;

  flex: 1;
  aspect-ratio: 16.9 / 24;
  border-radius: 1rem;
  background: #f9fafc;

  background-color: ${({ isSelected, mode }) =>
    isSelected ? (mode !== 'OLD' ? '#C8E2FF' : '#FFC0A2') : '#F9FAFC'};
`;

export const ModeBoxImage = styled.img<{ mode?: 'OLD' | 'YOUNG' }>`
  aspect-ratio: 9.8 / 8.9;
  margin-top: ${({ mode }) => (mode === 'OLD' ? '5rem' : '6.1rem')};
  margin-bottom: ${({ mode }) => (mode === 'OLD' ? '0rem' : '0.8rem')};
`;

export const ModeBoxText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.bold};
  color: #2b2c2f;
  font-size: 2rem;
  margin: auto 0;
`;

export const TipSection = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  padding-left: 2rem;
  margin-top: 4.4rem;

  ${({ theme }) => theme.fonts.bold};
  color: #2b2c2f;
  font-size: 1.8rem;

  img {
    aspect-ratio: 1.2/1.9;
    margin-right: 0.45rem;
  }
`;

export const TipText = styled.div`
  width: 100%;
  padding: 0.5rem 2rem;
  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.basic.dark_gray};
  font-size: 1.8rem;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  padding: 1.7rem 8.9rem;
  border-radius: 0.8rem;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.basic.gray : theme.colors.primary.orange400};

  align-items: center;
  justify-content: center;
  margin: auto 0%;

  color: #fff;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.medium};

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
