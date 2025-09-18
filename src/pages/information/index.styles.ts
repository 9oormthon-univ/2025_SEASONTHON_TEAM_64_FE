import styled from '@emotion/styled';

export const CreateIcon = styled.img`
  position: absolute;
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
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  align-items: center;

  justify-content: flex-end;
  padding: 0 2rem;
  margin-top: 6.5rem;

  img {
    cursor: pointer;
  }
`;

export const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;

  width: calc(100% - 1rem);
  margin-top: 1.2rem;
  padding: 0 2rem;
  align-items: center;
  gap: 3rem;

  ${({ theme }) => theme.fonts.heavy};
  color: #2b2c2f;
  text-align: center;
  font-size: 1.4rem;
  border-bottom: 0.1rem solid #dedede;
`;

export const Category = styled.div<{ selected: boolean }>`
  padding-bottom: 1.4rem;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.selected ? '0.3rem solid #FF6A25;' : '0.3rem solid transparent;'};
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  align-items: flex-start;
  padding-bottom: 12rem;

  gap: 2.3rem;
  margin-top: 1.8rem;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  gap: 1.6rem;
`;

export const InfoImage = styled.img`
  width: 7.6rem;
  height: 7.6rem;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoTitle = styled.div`
  max-width: 25.5rem;
  color: #2b2c2f;
  font-size: 1.4rem;
  font-weight: 700;
  word-wrap: break-word;
  margin: auto 0;
`;

export const InfoDescription = styled.div`
  max-width: 25.5rem;
  color: #8b8b8b;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto 0;
`;

export const InfoCategory = styled.div<{ category: string }>`
  width: fit-content;
  padding: 0.3rem 1rem;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;

  border-radius: 5rem;
  background: ${(props) =>
    props.category === 'HOSPITAL_FACILITIES'
      ? '#7595B7'
      : props.category === 'RESTAURANT_CAFE'
        ? '#80B775'
        : '#A8A8A8'};
`;
