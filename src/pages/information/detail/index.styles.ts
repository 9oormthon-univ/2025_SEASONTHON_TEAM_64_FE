import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
  background-color: #f5f5f5;
  padding-bottom: 12rem;

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

export const WriterInfo = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 2rem;

  width: calc(100% - 4rem);
  margin-top: 4.5rem;
  margin-bottom: 2.4rem;
`;

export const WriterProfile = styled.img`
  width: 5.3079rem;
  height: 5.3079rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const WriterName = styled.div`
  color: #2b2c2f;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const ContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;
  align-items: center;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  aspect-ratio: 353 / 64;

  align-items: center;
  padding: 0 2.7rem;

  border-radius: 2rem 2rem 0 0;
  background: #ff6a25;
  box-shadow: 0 1px 20.4px 0 rgba(0, 0, 0, 0.1);
`;

export const TitleLabel = styled.div`
  color: #ffffff;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.bold};
`;

export const Title = styled.div`
  margin-left: 0.6rem;
  padding-top: 0.3rem;
  border: none;
  background: transparent;

  color: #ffffff;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.bold};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #ffb787;
    font-size: 1.8rem;
    ${({ theme }) => theme.fonts.bold};
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: -1rem;
  padding: 1.5rem;

  width: calc(100% - 4rem);

  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 1px 20.4px 0 rgba(0, 0, 0, 0.1);
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const ImageBox = styled.img`
  width: 100%;
  aspect-ratio: 325 / 247;
  margin-bottom: 1.7rem;
  cursor: pointer;
`;

export const ContentDescription = styled.div`
  width: 100%;
  color: #2b2c2f;
  font-size: 1.6rem;
  line-height: 2.2rem;
  min-height: 4.4rem;
`;

export const ContentCreatedAt = styled.div`
  color: #8b8b8b;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const AddressSection = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 0.8rem;

  width: calc(100% - 4rem);
  margin-top: 2rem;
  cursor: pointer;
`;

export const AddressText = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  color: #2a7eff;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: 25%;
  text-underline-position: from-font;

  cursor: pointer;
`;

export const InfoCategory = styled.div<{ category: string }>`
  width: fit-content;
  padding: 0.6rem 1.5rem;

  color: #fff;
  text-align: center;

  font-size: 1rem;
  font-weight: 700;
  margin: 2rem auto 0rem 2rem;

  border-radius: 5rem;
  background: ${(props) =>
    props.category === 'HOSPITAL_FACILITIES'
      ? '#7595B7'
      : props.category === 'RESTAURANT_CAFE'
        ? '#80B775'
        : '#A8A8A8'};
`;
