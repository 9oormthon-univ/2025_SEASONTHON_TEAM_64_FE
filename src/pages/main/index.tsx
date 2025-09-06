import React, { useEffect } from 'react';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const {
    data: memberData,
    isLoading,
    isError,
  } = useApiQuery(getMemberDetail(), ['member']);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      navigate('/login', { replace: true });
      return;
    }

    if (!memberData) {
      navigate('/login', { replace: true });
      return;
    }

    if (memberData.role === 'ROLE_ADMIN') {
      navigate('/admin', { replace: true });
    }
  }, [isLoading, isError, memberData, navigate]);

  // TODO: 일반 유저 메인 콘텐츠 구성 예정 — 로딩 중엔 비워 두기
  if (isLoading) return <></>;
  return <></>;
};

export default Main;
