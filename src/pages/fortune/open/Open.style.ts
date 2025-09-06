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

export const SuccessText = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 10rem;

  span {
    color: #ff6a25;
    font-family: 'Apple SD Gothic Neo';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const SuccessVideo = styled.video`
  flex-shrink: 0;
  width: 40rem;
  height: 30rem;
  flex-shrink: 0;
`;

export const Button = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: row;

  width: calc(100% - 4rem);
  padding: 1.7rem 8.9rem;
  border-radius: 0.8rem;
  background: #ff6a25;

  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Apple SD Gothic Neo';
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.036rem;

  cursor: pointer;
`;
