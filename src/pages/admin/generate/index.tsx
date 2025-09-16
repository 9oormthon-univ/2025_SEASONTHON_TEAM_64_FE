import React, { useState } from 'react';
import * as S from './index.styles';
import nonImage from '../../../assets/admin/non-image.svg';
import { useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../../apis/member';
import { createMission } from '../../../apis/mission';

const AdminGenerate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { data: memberData } = useApiQuery(getMemberDetail(), ['member']);

  const handleSubmit = () => {
    if (title.length === 0) {
      alert('미션 내용을 입력해주세요.');
      return;
    }
    createMission({ description: title })
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/admin/list');
        }, 10000);
      })
      .catch(() => {
        alert('미션 등록에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <>
      {isSuccess && (
        <S.SuccessAlertContainer>
          <S.SuccessPopUp>오늘의 미션이 등록되었습니다.</S.SuccessPopUp>
        </S.SuccessAlertContainer>
      )}
      <S.Conatiner>
        <S.TopTextBox>
          <S.TopTextTitle>오늘의 미션을 등록하세요!</S.TopTextTitle>
          <S.TopTextDescription>
            관리자는 미션을 등록해주세요.
          </S.TopTextDescription>
        </S.TopTextBox>
        <S.TextAreaSection>
          <S.AdminInfoSection>
            <S.AdminProfileImage
              src={
                memberData?.profileImageUrl
                  ? memberData.profileImageUrl
                  : nonImage
              }
              alt="admin profile"
            />
            <S.AdminNameSection>
              <S.AdminNameText>관리자</S.AdminNameText>
              <S.AdminNickname>{memberData?.nickname}</S.AdminNickname>
            </S.AdminNameSection>
          </S.AdminInfoSection>
          <S.TextArea
            placeholder="미션 내용을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.TextAreaSection>
        <S.Button onClick={handleSubmit}>등록하기</S.Button>
      </S.Conatiner>
    </>
  );
};

export default AdminGenerate;
