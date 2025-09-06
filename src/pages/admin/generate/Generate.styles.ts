import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
  gap: 4.4rem;
`;

export const MainTitleBox = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  height: 9.4rem;

  margin-top: 12.2rem;
  border-radius: 2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  align-items: center;
  justify-content: center;

  gap: 0.5rem;
`;

export const MainTitle = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04rem;
`;

export const MainSubTitle = styled.div`
  color: #8b8b8b;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.028rem;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  height: 25.3rem;

  border-radius: 2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  padding: 0 1.7rem;
`;

export const AdminLabel = styled.div`
  display: flex;
  flex-direction: row;

  width: fit-content;
  height: fit-content;

  padding: 1.7rem 0 0 0;
  gap: 1.4rem;

  align-items: center;
  justify-content: center;
`;

export const AdminImage = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  border-radius: 50%;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const AdminTextSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.3rem;
`;

export const AdminText = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.028rem;
`;

export const AdminNickname = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.028rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
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
  background: rgba(101, 101, 101, 0.4);
`;

export const SuccesPopUp = styled.div`
  display: flex;
  width: 31.9rem;
  height: 7rem;
  border-radius: 2rem;
  border: 1px solid #ff6a25;
  background: rgba(255, 255, 255, 0.8);
  color: #2b2c2f;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.8rem;
  font-weight: 600;

  align-items: center;
  justify-content: center;
`;
