import React from 'react';
import * as S from './index.styles';
import back from '../../../assets/fortune/left-arrow.svg';
import cookie from '../../../assets/gif/fortune_content.gif';
import { useLocation, useNavigate } from 'react-router-dom';
import OldModeGuide from '../../../components/common/OldModeGuide';
import fortuneGuide from '../../../assets/oldmode/fortune_guide.jpg';

const FortuneDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <>
      <OldModeGuide
        pageKey="fortune-detail"
        imageSrc={fortuneGuide}
        version="v1"
      />
      <S.Container>
        <S.Header>
          <img src={back} alt="back" onClick={() => navigate('/fortune')} />
        </S.Header>
        <S.Image src={cookie} alt="fortune cookie" />
        <S.FortuneDescription>{state?.fortune}</S.FortuneDescription>
      </S.Container>
    </>
  );
};

export default FortuneDetail;
