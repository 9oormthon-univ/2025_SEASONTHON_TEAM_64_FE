import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  margin-top: 6rem;
`;

export const HeaderIcon = styled.img`
  width: 1.2rem;
  height: 2.4rem;
  flex-shrink: 0;
  cursor: pointer;
`;

export const HeaderText = styled.div`
  color: #2b2c2f;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.036rem;
  margin: 0 auto;
`;

export const MissionList = styled.div`
  margin-top: 10rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;

  width: calc(100% - 4rem);
  height: fit-content;

  overflow-y: auto;
  gap: 1.5rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Mission = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 1.8rem 1.4rem;

  align-items: center;
  justify-content: space-between;

  color: #2b2c2f;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.6rem;
  font-weight: 600;

  border-radius: 0.8rem;
  background: #fff;
  box-shadow: 0 1px 7.6px 0 rgba(0, 0, 0, 0.1);

  img {
    width: 1.8rem;
    height: 0.4rem;
    transform: rotate(90deg);
    flex-shrink: 0;
  }
`;
