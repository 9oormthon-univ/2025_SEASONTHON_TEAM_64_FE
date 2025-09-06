import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;
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
  width: 8.8667rem;
  height: 2.1rem;
  flex-shrink: 0;
  aspect-ratio: 38/9;
`;

export const Front = styled.img`
  position: absolute;
  left: 40%;
`;

export const Notify = styled.img`
  width: 2.5rem;
  height: 2.8rem;
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
  color: #3d8aff;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.028rem;
`;

export const MissionContent = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.036rem;
`;

export const GenenrateIcon = styled.img`
  position: absolute;
  right: 2rem;
  bottom: 12rem;
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  cursor: pointer;
`;

// ===== Feed List (Infinite) =====
export const FeedList = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  align-items: center;
  margin-top: 5.6rem;
  padding-bottom: 10rem;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  gap: 0.7rem;
`;

export const FeedCard = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;

  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(210, 210, 210, 0.3);
`;

export const FeedStatus = styled.div`
  color: #7a7b7e;
  text-align: center;
  padding: 1rem 0 2rem;
`;

export const MemberLabel = styled.div`
  display: flex;
  flex-direction: row;

  width: fit-content;
  height: fit-content;

  padding: 1.7rem 0 0 1.7rem;
  gap: 1.4rem;

  align-items: center;
  justify-content: center;
`;

export const MemberImage = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  border-radius: 50%;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const MemberTextSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.3rem;
`;

export const MemberText = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.028rem;
`;

export const MemberNickname = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.028rem;
`;

export const FeedImage = styled.img`
  width: calc(100% - 3rem);
  aspect-ratio: 32.5 / 18.9;

  margin: 1.5rem auto;
  border-radius: 2rem;
`;

export const FeedIconSection = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;
  margin-left: 1.5rem;
`;

export const FeedDescription = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;

  margin-top: 1.8rem;
  margin-bottom: 2.6rem;
  margin-left: 1.5rem;
`;
