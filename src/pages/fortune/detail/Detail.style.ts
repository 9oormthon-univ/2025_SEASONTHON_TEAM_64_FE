import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  padding: 0 2rem;
  margin-top: 6rem;

  img {
    cursor: pointer;
  }
`;

export const SuccessVideo = styled.video`
  width: 31.2rem;
  height: 29.2rem;
  flex-shrink: 0;
`;

export const FortuneBox = styled.div`
  display: flex;
  width: calc(100% - 11.8rem);
  height: 50rem;
  background: #fafafa;

  color: #2b2c2f;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3rem; /* 150% */

  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 0 1px 30.3px 0 rgba(0, 0, 0, 0.1);
`;
