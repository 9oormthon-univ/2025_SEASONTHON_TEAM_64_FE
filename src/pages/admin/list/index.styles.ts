import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
  padding: 6.1rem 0;
`;

export const MissionList = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 2rem);
  margin-top: 10rem;

  padding: 1rem 1rem;
  padding-bottom: 6rem;

  overflow-y: auto;
  gap: 1.5rem;

  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;
