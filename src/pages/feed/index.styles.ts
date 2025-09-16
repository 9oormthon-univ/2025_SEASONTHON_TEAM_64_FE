import styled from '@emotion/styled';

export const CreateIcon = styled.img`
  position: absolute;
  right: 2rem;
  bottom: 12rem;
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
