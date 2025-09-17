import React from 'react';
import * as S from './Header.styles';

interface HeaderProps {
  onBack: () => void;
  title?: string;
  backIcon: string;
}

const Header: React.FC<HeaderProps> = ({
  onBack,
  title = '게시하기',
  backIcon,
}) => {
  return (
    <S.Wrapper>
      <S.Back src={backIcon} alt="back" onClick={onBack} />
      <S.Title>{title}</S.Title>
    </S.Wrapper>
  );
};

export default Header;
