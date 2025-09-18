import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: linear-gradient(180deg, #ff6a25 2.23%, #fafafa 28.58%);

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
