import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  align-items: center;

  justify-content: flex-start;
  padding-left: 2rem;
  margin-top: 6.5rem;

  img {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  width: 100%;
  ${({ theme }) => theme.fonts.heavy}
  color: #2b2c2f;
  font-size: 2.8rem;
  padding-left: 2rem;
  margin-top: 2.7rem;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3.6rem;
  width: 100%;

  gap: 3.6rem;
  padding: 0 2rem;
`;

export const NotificationItem = styled.div<{ type: string }>`
  display: flex;
  flex-direction: row;

  ${({ type }) => type === 'MISSION' && `gap: 1.5rem`}
  ${({ type }) => type === 'FORTUNE' && `gap: 0.9rem`}
  ${({ type }) => type === 'LIKE' && `gap: 3rem`}
  ${({ type }) => type === 'COMMENT' && `gap: 3rem`}
`;

export const NotificationImage = styled.img`
  margin-bottom: auto;
`;

export const NotificationContentBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.4rem;
`;

export const NotificationType = styled.div`
  ${({ theme }) => theme.fonts.heavy}
  color: #2b2c2f;
  font-size: 1.6rem;
`;

export const NotificationMessage = styled.div`
  ${({ theme }) => theme.fonts.medium}
  color: #8B8B8B;
  font-size: 1.6rem;
`;

export const NotificationTime = styled.div`
  ${({ theme }) => theme.fonts.light}
  color: #C5C5C5;
  font-size: 1.6rem;
  margin-left: auto;
`;
