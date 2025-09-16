import React from 'react';
import * as S from './AdminInfo.styles';
import nonImage from '../../../assets/admin/non-image.svg';

interface AdminInfoProps {
  profileImageUrl?: string;
  nickname?: string;
}

const AdminInfo: React.FC<AdminInfoProps> = ({ profileImageUrl, nickname }) => {
  return (
    <S.Wrapper>
      <S.ProfileImage
        src={profileImageUrl ? profileImageUrl : nonImage}
        alt="admin profile"
      />
      <S.InfoTextBox>
        <S.RoleText>관리자</S.RoleText>
        <S.Nickname>{nickname}</S.Nickname>
      </S.InfoTextBox>
    </S.Wrapper>
  );
};

export default AdminInfo;
