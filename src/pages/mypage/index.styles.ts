import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;

  align-items: center;
  padding-bottom: 16rem;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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

export const Notify = styled.img`
  aspect-ratio: 25/28;
  flex-shrink: 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  align-items: center;

  margin-top: 5rem;
  gap: 3.3rem;
`;

export const ProfileImage = styled.img`
  width: 10.5rem;
  height: 10.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  align-items: flex-start;
`;

export const Nickname = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const Introduction = styled.div`
  font-size: 1.4rem;
  color: #8b8b8b;
`;

export const EditButton = styled.button`
  padding: 0.5rem 1.2rem;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  background: #ebebeb;

  color: #8b8b8b;
  font-size: 1rem;
  font-weight: 600;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 2rem);
  align-items: center;

  margin-top: 5.4rem;
  gap: 2.5rem;
`;

export const RowMenu = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const RowMenuItem = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 16.9rem;
  box-sizing: border-box;
  align-items: center;
  padding: 1.2rem;
  gap: 3rem;
  border-radius: 1.2rem;
  background: ${({ color }) => color};
  box-shadow: 0 1px 4px 0 rgba(197, 197, 197, 0.3);
`;

export const RowMenuTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  color: #fff;
  font-size: 1.2rem;
  margin: auto 0;
`;

export const RowMenuDescription = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 800;
  margin: auto 0;

  img {
    margin: auto 0;
    width: 2.6rem;
    height: 0.8rem;
  }
`;

export const ColumnMenuItem = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  border-radius: 1.6rem;
  background: #fff9eb;
  box-shadow: 0 14px 22.6px 0 rgba(0, 0, 0, 0.15);

  padding: 2.9rem 1.8rem;
`;

export const ColumnImage = styled.img`
  width: 11.2rem;
  height: 11.2rem;
  margin: 0 auto;
  transform: scale(1.5);
`;

export const ColumnContent = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-top: 4rem;
`;

export const ColumnTextBox = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  gap: 0.5rem;
`;

export const ColumnTitle = styled.div`
  color: #2b2c2f;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ColumnDescription = styled.div`
  color: #8b8b8b;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const ColumnButton = styled.button`
  display: inline-flex;
  padding: 1rem 1.1rem;
  justify-content: center;
  align-items: center;

  border-radius: 5rem;
  background: #fee4b3;

  color: #2b2c2f;
  font-size: 1.4rem;
  font-weight: 800;
`;
