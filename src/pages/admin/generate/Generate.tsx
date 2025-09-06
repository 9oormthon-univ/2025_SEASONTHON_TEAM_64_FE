import React, { useState } from 'react';
import * as S from './Generate.styles';
import nonImage from '../assets/non-image.svg';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../../apis/member';
import { postMissionUpload } from '../../../apis/admin';
import { useNavigate } from 'react-router-dom';

const Generate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { data: memberData } = useApiQuery(getMemberDetail(), ['member']);

  const handleSubmit = () => {
    if (title.length === 0) {
      alert('미션 내용을 입력해주세요.');
      return;
    }
    postMissionUpload({ title })
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/admin/list');
        }, 3000);
      })
      .catch(() => {
        alert('미션 등록에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <>
      {isSuccess && (
        <S.SuccessBackground>
          <S.SuccesPopUp>오늘의 미션이 등록되었습니다.</S.SuccesPopUp>
        </S.SuccessBackground>
      )}
      <S.Container>
        <S.MainTitleBox>
          <S.MainTitle>오늘의 미션을 등록하세요!</S.MainTitle>
          <S.MainSubTitle>관리자는 미션을 등록해주세요</S.MainSubTitle>
        </S.MainTitleBox>
        <S.InputSection>
          <S.AdminLabel>
            <S.AdminImage
              src={
                memberData?.profileImageUrl
                  ? memberData.profileImageUrl
                  : nonImage
              }
              alt="Admin Image"
            />
            <S.AdminTextSection>
              <S.AdminText>관리자</S.AdminText>
              <S.AdminNickname>{memberData?.nickname}</S.AdminNickname>
            </S.AdminTextSection>
          </S.AdminLabel>
          <S.TextArea
            placeholder="오늘의 미션 작성 ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></S.TextArea>
        </S.InputSection>
        <S.Button onClick={handleSubmit}>등록하기</S.Button>
      </S.Container>
    </>
  );
};

export default Generate;
