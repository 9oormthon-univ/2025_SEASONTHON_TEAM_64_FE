import React, { useState } from 'react';
import * as S from './index.styles';
import { useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../../apis/member';
import { createMission } from '../../../apis/mission';
import SuccessAlert from '../../../components/successAlert/SuccessAlert';
import AdminInfo from '../../../components/adminInfo/AdminInfo';

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
      <SuccessAlert open={isSuccess} message="오늘의 미션이 등록되었습니다." />
      <S.Conatiner>
        <S.TopTextBox>
          <S.TopTextTitle>오늘의 미션을 등록하세요!</S.TopTextTitle>
          <S.TopTextDescription>
            관리자는 미션을 등록해주세요.
          </S.TopTextDescription>
        </S.TopTextBox>
        <S.TextAreaSection>
          <AdminInfo
            profileImageUrl={memberData?.profileImageUrl}
            nickname={memberData?.nickname}
          />
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
