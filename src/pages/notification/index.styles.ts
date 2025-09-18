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
  display: grid;
  grid-template-columns: 28px 1fr auto; /* icon | content | time */
  column-gap: 1.2rem; /* 동일 간격 */
  align-items: start;
`;

export const NotificationImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  align-self: start;
`;

export const NotificationContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0; /* 줄바꿈 시 시간 영역을 침범하지 않도록 */
`;

export const NotificationType = styled.div`
  width: fit-content;
  ${({ theme }) => theme.fonts.heavy}
  color: #2b2c2f;
  font-size: 1.6rem;
`;

export const NotificationMessage = styled.div`
  ${({ theme }) => theme.fonts.medium}
  color: #8B8B8B;
  font-size: 1.6rem;
  word-break: keep-all; /* 한글 줄바꿈 자연스럽게 */
  overflow-wrap: anywhere; /* 긴 토큰도 줄바꿈 허용 */
`;

export const NotificationTime = styled.div`
  width: max-content;
  ${({ theme }) => theme.fonts.light}
  color: #C5C5C5;
  font-size: 1.2rem;
  align-self: start;
`;
