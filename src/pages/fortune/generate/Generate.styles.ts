import { style } from './../../../../node_modules/postcss-minify-font-values/types/lib/keywords.d';
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

export const Text = styled.div`
  margin-top: 9.7rem;
  color: #000;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  span {
    color: #ff6a25;
    font-family: 'Apple SD Gothic Neo';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const TextArea = styled.textarea`
  width: 35.3rem;
  height: 22.9rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 1px 20.4px 0 rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  padding: 3.2rem 3.9rem;

  margin-top: 6rem;

  :focus {
    outline: none;
  }
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

export const SuccessBackground = styled.div`
  position: absolute;
  z-index: 9999;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(22, 22, 22, 0.8);
`;

export const SuccessText = styled.div`
  color: #fff;
  text-align: center;
  font-family: 'Apple SD Gothic Neo';
  font-size: 2.4rem;
  font-weight: 700;

  span {
    color: #ffa263;
    font-family: 'Apple SD Gothic Neo';
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

export const SuccessVideo = styled.video`
  margin-top: 4.5rem;
  width: 53.8rem;
  height: 39.15rem;
  flex-shrink: 0;
`;
