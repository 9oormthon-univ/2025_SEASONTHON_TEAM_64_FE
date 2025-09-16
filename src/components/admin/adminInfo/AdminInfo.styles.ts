import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.4rem;
`;

export const ProfileImage = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const RoleText = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.4rem;
`;

export const Nickname = styled.div`
  color: #2b2c2f;
  ${({ theme }) => theme.fonts.light};
  font-size: 1.4rem;
`;
