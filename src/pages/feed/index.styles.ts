import styled from '@emotion/styled';

export const CreateIcon = styled.img`
  position: absolute;
  z-index: 99;
  right: 2rem;
  bottom: 10rem;
  aspect-ratio: 1/1;
  flex-shrink: 0;
  cursor: pointer;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
  background: linear-gradient(180deg, #ff6a25 2.23%, #fafafa 28.58%);
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: calc(100% - 4rem);
  display: flex;
  flex-direction: row;

  margin-top: 6rem;
  justify-content: space-between;
`;

export const Logo = styled.img`
  aspect-ratio: 88/21;
  flex-shrink: 0;
  aspect-ratio: 38/9;
`;

export const Front = styled.img`
  position: absolute;
  left: 40%;
`;

export const Notify = styled.img`
  aspect-ratio: 25/28;
  flex-shrink: 0;
`;

export const TodayMissionBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3.5rem;

  width: calc(100% - 4rem);
  height: 8.5rem;
  padding: 2rem 3.4rem;

  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    180deg,
    #fff 77.4%,
    rgba(255, 255, 255, 0.7) 100%
  );
`;

export const MissionTitle = styled.div`
  ${({ theme }) => theme.fonts.bold}
  color: #3d8aff;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const MissionContent = styled.div`
  ${({ theme }) => theme.fonts.bold}
  color: #2b2c2f;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;
  align-items: center;

  overflow-y: auto;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 12rem;

  gap: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Sentinel = styled.div`
  height: 1px;
`;

export const Loading = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
`;

export const EndMessage = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  color: #777;
`;

export const FeedCard = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  aspect-ratio: 35.3/37.9;

  padding: 2rem 2rem;

  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.basic.white};
  box-shadow: 0 0 4px 0 rgba(210, 210, 210, 0.3);
`;

export const FeedOwner = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const OwnerName = styled.div`
  ${({ theme }) => theme.fonts.bold}
  color: #2b2c2f;
  font-size: 1.6rem;
`;

export const FeedImage = styled.img`
  width: 100%;
  aspect-ratio: 32.5 / 18.9;
  object-fit: fill;
  border-radius: 2rem;
  margin-bottom: 1.3rem;
`;

export const FeedActions = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 0 0.5rem;
`;

export const FeedLikeButton = styled.img`
  width: 2.4rem;
  height: 2.2rem;
  cursor: pointer;
`;

export const FeedCommentButton = styled.img`
  width: 6.2rem;
  height: 2.3rem;
  cursor: pointer;
`;

export const FeedTime = styled.span`
  margin-left: auto;
  ${({ theme }) => theme.fonts.medium};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.basic.gray};
`;

export const FeedDescription = styled.div`
  ${({ theme }) => theme.fonts.medium};
  color: #2b2c2f;
  font-size: 1.4rem;
  margin: 1.8rem 0;
`;
