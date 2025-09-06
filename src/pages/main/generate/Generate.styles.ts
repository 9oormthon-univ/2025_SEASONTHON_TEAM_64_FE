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

export const Back = styled.img`
  width: 1rem;
  height: 2rem;
  flex-shrink: 0;
  aspect-ratio: 1/2;
  cursor: pointer;
`;

export const ImageText = styled.div`
  color: #fff;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04rem;

  position: absolute;
  left: 42%;
`;

export const Notify = styled.img`
  width: 2.5rem;
  height: 2.8rem;
  flex-shrink: 0;
`;

export const TodayMissionBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3.1rem;

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

export const TextBoxSection = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  height: 50%;

  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(210, 210, 210, 0.3);

  margin-top: 5.6rem;
  align-items: center;
`;

export const SelectImage = styled.img`
  width: calc(100% - 2.8rem);
  height: 24.7rem;
  flex-shrink: 0;

  margin-top: 1.9rem;
  object-fit: cover;
  border-radius: 2rem;

  aspect-ratio: 32.5 / 24.7;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 3.4rem);
  height: 100%;

  padding: 1.7rem 0;

  background: none;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  padding: 1.7rem 8.9rem;
  border-radius: 0.8rem;
  background: #ff6a25;

  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.036rem;

  cursor: pointer;
`;

export const SuccessBackground = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(22, 22, 22, 0.8);
`;

export const SuccessText = styled.div`
  color: #fff;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2.4rem;
  font-weight: 700;
`;

export const SuccessImage = styled.img`
  margin-top: 4.5rem;
  width: 14.6rem;
  height: 13.05rem;
  flex-shrink: 0;
`;
