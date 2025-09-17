import React, { useEffect } from 'react';
import * as S from './index.styles';
import logo from '../../assets/onboarding/logo.svg';
import maru from '../../assets/gif/onboarding_maru.gif';
import { setOnboardingDone, hasToken } from '../../utils/authState';
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setOnboardingDone();
    const timer = setTimeout(() => {
      navigate(hasToken() ? '/' : '/login', { replace: true });
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <S.Container>
        <S.Logo src={logo} />
        <S.OnBoardingMaru src={maru} />
      </S.Container>
    </>
  );
};

export default OnBoarding;
