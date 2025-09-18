import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
  background-color: #f5f5f5;

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

export const ContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;
  margin-top: 4.4rem;
  align-items: center;
`;

export const InputTitleSection = styled.div`
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

export const InputTitleLabel = styled.div`
  color: #ffffff;
  font-size: 1.8rem;
  ${({ theme }) => theme.fonts.bold};
`;

export const InputTitle = styled.input`
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
  aspect-ratio: 353 / 380;

  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 1px 20.4px 0 rgba(0, 0, 0, 0.1);

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SelectImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const SelectImageBox = styled.img`
  width: 100%;
  aspect-ratio: 325 / 247;

  object-fit: fill;
  margin-bottom: 1.7rem;
  cursor: pointer;
`;

export const ContentTextArea = styled.textarea`
  width: 100%;
  aspect-ratio: 1 / 0.2;
  border: none;
  resize: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #2b2c2f;
    font-size: 1.8rem;
    ${({ theme }) => theme.fonts.medium};
  }
`;

export const AddressButton = styled.button`
  display: flex;

  width: fit-content;
  padding: 0.6rem 1.5rem;

  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  border-radius: 5rem;
  background: #3485ff;

  color: #fff;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
`;

export const AddressText = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 0.8rem;

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

export const CategoryText = styled.div`
  width: calc(100% - 4rem);
  margin-top: 2.6rem;

  ${({ theme }) => theme.fonts.bold};
  color: #2b2c2f;
  font-size: 1.6rem;
`;

export const CategoryButtonList = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  width: calc(100% - 4rem);
  margin-top: 2rem;
`;

export const CategoryButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  gap: 1.3rem;
`;

export const CategoryImage = styled.img`
  width: 3.6rem;
  height: 4.4rem;
  flex-shrink: 0;
`;

export const CategoryButton = styled.button<{ isSelected: boolean | null }>`
  display: flex;
  flex-direction: column;

  padding: 0.6rem 1.5rem;
  border-radius: 5rem;
  background: #fff;

  color: ${(props) => (props.isSelected ? '#fff' : '#2b2c2f')};
  background-color: ${(props) => (props.isSelected ? '#ff6a25' : '#fff')};
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  margin: 5rem 0;

  width: calc(100% - 4rem);
  padding: 1.7rem 0rem;
  text-align: center;

  border-radius: 0.8rem;
  background: #ff6a25;
  border: none;

  color: #fff;
  ${({ theme }) => theme.fonts.bold}
  font-size: 1.8rem;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
