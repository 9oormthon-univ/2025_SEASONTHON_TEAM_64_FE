import React, { useState } from 'react';
import * as S from './index.styles';
import back from '../../../assets/fortune/left-arrow.svg';
import successVideo from '../../../assets/gif/fortune_send.gif';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../../../components/toast/Toast';
import { createFortune } from '../../../apis/fortune';
import SuccessOverlay from '../../../components/feed/SuccessOverlay';

const FortuneSend = () => {
  const navigate = useNavigate();
  const { show } = useToastContext();
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    createFortune({ description: text })
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/fortune');
        }, 3000);
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
    <>
      {isSuccess && (
        <SuccessOverlay
          imageSrc={successVideo}
          message={
            <>
              당신의 <span>포춘쿠키</span>가
              <br />
              누군가에게 전송되었습니다!
            </>
          }
        />
      )}
      <S.Container>
        <S.Header>
          <img src={back} alt="back" onClick={() => navigate(-1)} />
        </S.Header>
        <S.Text>
          누군가를 위한 <br />
          <span>따듯한 말</span>을 전해봐요.
        </S.Text>
        <S.TextArea
          placeholder="내용을 입력해주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <S.Button disabled={text.length === 0} onClick={handleSubmit}>
          전달하기
        </S.Button>
      </S.Container>
    </>
  );
};

export default FortuneSend;
