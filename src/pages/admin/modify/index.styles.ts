import styled from '@emotion/styled';

export const Conatiner = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  padding: 12.2rem 2rem 0rem 2rem;
  align-items: center;
`;

export const TopTextBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2.6rem 0;
  gap: 0.5rem;

  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  color: #2b2c2f;
  margin-bottom: 4.4rem;
`;

export const TopTextTitle = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.bold};
  font-size: 2rem;
`;

export const TopTextDescription = styled.div`
  color: ${({ theme }) => theme.colors.basic.dark_gray};
  ${({ theme }) => theme.fonts.light};
  font-size: 1.4rem;
`;

export const TextAreaSection = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  aspect-ratio: 35.3 / 25.3;
  padding: 2rem 2.4rem;

  border-radius: 2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const AdminInfoSection = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 1.4rem;
`;

export const AdminProfileImage = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const AdminNameSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.2rem;
`;

export const AdminNameText = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.4rem;
`;

export const AdminNickname = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.light};
  font-size: 1.4rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  aspect-ratio: 35.3 / 25.3;
  padding: 2rem 0rem;

  :focus {
    outline: none;
  }
  resize: none;
`;

export const Button = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 1.7rem 8.9rem;
  border-radius: 0.8rem;
  background: #ff6a25;

  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.bold};

  cursor: pointer;
`;

export const SuccessAlertContainer = styled.div`
  position: absolute;
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

export const SuccessPopUp = styled.div`
  display: flex;

  width: calc(100% - 7.4rem);
  padding: 2.4rem 5.1rem;

  border-radius: 2rem;
  border: 1px solid #ff6a25;
  background: rgba(255, 255, 255, 0.8);

  color: #2b2c2f;
  text-align: center;

  ${({ theme }) => theme.fonts.bold};
  font-size: 1.8rem;

  align-items: center;
  justify-content: center;
`;
