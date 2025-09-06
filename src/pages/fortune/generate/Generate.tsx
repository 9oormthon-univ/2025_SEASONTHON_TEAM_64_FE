import React, { useState } from 'react';
import * as S from './Generate.styles';
import Back from '../assets/BackIcon.svg';
import Notify from '../assets/notify.svg';
import success from '../assets/FortuneDone.webm';
import { useNavigate } from 'react-router-dom';
import { sendFortune } from '../../../apis/fortune';

const Generate = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!text) {
      alert('내용을 입력해주세요.');
      return;
    }

    sendFortune(text)
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/fortune');
        }, 4000);
      })
      .catch(() => {
        alert('따뜻한 말 전달에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <>
      {isSuccess && (
        <S.SuccessBackground>
          <S.SuccessText>
            당신의 <span>포춘쿠키</span>가
            <br />
            누군가에게 전송되었습니다!
          </S.SuccessText>
          <S.SuccessVideo src={success} autoPlay muted playsInline />
        </S.SuccessBackground>
      )}
      <S.Container>
        <S.Header>
          <img src={Back} onClick={() => navigate(-1)} />
          <img src={Notify} />
        </S.Header>
        <S.Text>
          누군가를 위한 <br />
          <span>따뜻한 말</span>을 전해봐요.
        </S.Text>
        <S.TextArea
          placeholder="내용을 입력하세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <S.Button onClick={handleSubmit}>전달하기</S.Button>
      </S.Container>
    </>
  );
};

export default Generate;
