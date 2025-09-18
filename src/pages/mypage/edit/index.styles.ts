import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 6rem;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  padding: 0 2rem;
  margin-top: 6rem;

  img {
    cursor: pointer;
  }
`;

export const HeaderTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.fonts.heavy};
  color: #2b2c2f;
  font-size: 1.8rem;
`;

export const ProfileImage = styled.img`
  width: 10.5rem;
  height: 10.5rem;
  flex-shrink: 0;
  margin: 0 auto;
  border-radius: 50%;
  margin-top: 5.9rem;
  filter: drop-shadow(0 0 4px #ffa263);
`;

export const Nickname = styled.div`
  color: #2b2c2f;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2.1rem;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1rem;
  background-color: #f5f5f5;

  margin: 5.2rem 0 3.7rem 0;
`;

export const MenuTitle = styled.div`
  width: calc(100% - 4rem);
  color: #2b2c2f;
  font-size: 2rem;
  font-weight: 700;

  margin-bottom: 2rem;
`;

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  justify-content: space-between;
  align-items: center;
`;

export const MenuText = styled.div`
  color: #8b8b8b;
  font-size: 1.6rem;
  font-weight: 700;
`;
