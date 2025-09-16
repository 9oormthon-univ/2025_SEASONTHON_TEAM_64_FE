import React from 'react';
import * as S from './index.styles';
import frontMaru from '../../assets/login/front_maru.svg';
import rightMaru from '../../assets/login/right_maru.svg';
import logo from '../../assets/login/logo.svg';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.Container>
        <S.ServiceName>
          <img src={logo} alt="Logo" />
        </S.ServiceName>
        <S.ButtonSection>
          <S.Button onClick={() => navigate('/admin/generate')}>
            미션 등록하기
          </S.Button>
          <S.Button onClick={() => navigate('/admin/list')}>
            미션 리스트보기
          </S.Button>
        </S.ButtonSection>
        <S.MaruSection>
          <S.FrontMaru src={frontMaru} alt="Front Maru" />
          <S.RightMaru src={rightMaru} alt="Right Maru" />
        </S.MaruSection>
      </S.Container>
    </>
  );
};

export default AdminPage;
