import React from 'react';
import * as S from './index.styles';
import loginButton from './assets/kakaoLogin.svg';
import frontMaru from './assets/front_maru.svg';
import rightMaru from './assets/right_maru.svg';
import logo from './assets/logo.svg';

const Login = () => {
  return (
    <>
      <S.Container>
        <S.ServiceName>
          <img src={logo} alt="Logo" />
        </S.ServiceName>
        <S.ServiceDescriptionSection>
          <S.ServiceDescription>청년과 노인의 마음을</S.ServiceDescription>
          <S.ServiceDescription>나누는 따뜻한 디지털 마루</S.ServiceDescription>
        </S.ServiceDescriptionSection>
        <S.LoginButton>
          <a
            href={process.env.REACT_APP_API_URL + '/oauth2/authorization/kakao'}
          >
            <img src={loginButton} alt="Kakao Login" />
          </a>
        </S.LoginButton>
        <S.MaruSection>
          <S.FrontMaru src={frontMaru} alt="Front Maru" />
          <S.RightMaru src={rightMaru} alt="Right Maru" />
        </S.MaruSection>
      </S.Container>
    </>
  );
};

export default Login;
