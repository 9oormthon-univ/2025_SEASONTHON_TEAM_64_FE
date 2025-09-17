import React from 'react';
import * as S from './index.styles';
import back from '../../../assets/fortune/left-arrow.svg';
import cookie from '../../../assets/gif/fortune_cookie.gif';
import { useNavigate } from 'react-router-dom';
import { assignFortune } from '../../../apis/fortune';
import { useToastContext } from '../../../components/toast/Toast';

const FortuneReceive = () => {
  const navigate = useNavigate();
  const { show } = useToastContext();
  const handleNavigate = () => {
    assignFortune()
      .execute()
      .then((res) => {
        navigate('/fortune/detail', {
          state: { fortune: res.data.description || '' },
        });
      })
      .catch((error) => {
        show(
          error?.response?.data?.message || '오류가 발생했습니다.',
          'error',
          false,
        );
      });
  };

  return (
    <S.Container>
      <S.Header>
        <img src={back} alt="back" onClick={() => navigate(-1)} />
      </S.Header>
      <S.Text>
        새로운 <span>포춘쿠키</span>가 도착했어요! <br />
        열어보시겠습니까?
      </S.Text>
      <S.Image src={cookie} alt="fortune cookie" />
      <S.Button onClick={handleNavigate}>받기</S.Button>
    </S.Container>
  );
};

export default FortuneReceive;
