import React from 'react';
import * as S from './index.styles';
import youngGif from '../../assets/gif/young_maru.gif';
import oldGif from '../../assets/gif/old_maru.gif';
import young from '../../assets/user/young_maru.svg';
import old from '../../assets/user/old_maru.svg';
import tip from '../../assets/user/tip.svg';
import { updateMemberMode } from '../../apis/member';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = React.useState<
    'OLD' | 'YOUNG' | null
  >(null);

  const handleSelectMode = (mode: 'OLD' | 'YOUNG') => {
    setSelectedMode(mode);
  };

  const handleChangeMode = () => {
    if (selectedMode) {
      updateMemberMode(selectedMode)
        .execute()
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          alert('모드 변경에 실패했습니다. 다시 시도해주세요.');
        });
    }
  };

  return (
    <S.Container>
      <S.Title>
        노인모드와 청년모드 중 하나를
        <br />
        선택해주세요!
      </S.Title>
      <S.ModeBoxWrapper>
        <S.ModeBox
          mode="OLD"
          isSelected={selectedMode === 'OLD'}
          onClick={() => handleSelectMode('OLD')}
        >
          <S.ModeBoxImage
            src={selectedMode === 'OLD' ? oldGif : old}
            alt="노인모드"
            mode="OLD"
          />

          <S.ModeBoxText>노인</S.ModeBoxText>
        </S.ModeBox>
        <S.ModeBox
          mode="YOUNG"
          isSelected={selectedMode === 'YOUNG'}
          onClick={() => handleSelectMode('YOUNG')}
        >
          <S.ModeBoxImage
            src={selectedMode === 'YOUNG' ? youngGif : young}
            alt="청년모드"
            mode="YOUNG"
          />
          <S.ModeBoxText>청년</S.ModeBoxText>
        </S.ModeBox>
      </S.ModeBoxWrapper>
      <S.TipSection>
        <img src={tip} alt="팁 아이콘" />
        꿀팁
      </S.TipSection>
      <S.TipText>노인모드는 글씨와 사진을 크게 볼 수 있어요.</S.TipText>
      <S.Button disabled={!selectedMode} onClick={handleChangeMode}>
        선택하기
      </S.Button>
    </S.Container>
  );
};

export default UserPage;
