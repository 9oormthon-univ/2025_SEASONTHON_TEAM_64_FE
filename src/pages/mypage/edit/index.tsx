import React from 'react';
import * as S from './index.styles';
import back from '../../../assets/mypage/left-arrow.svg';
import profile from '../../../assets/mypage/profile.svg';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getMemberDetail, updateMemberMode } from '../../../apis/member';
import ModeToggle from '../../../components/common/ModeToggle';
import { clearAllGuideFlags } from '../../../utils/clearGuides';
import useToast from '../../../hooks/useToast';
import { queryClient } from '../../../QueryClient';
import { useNavigate } from 'react-router-dom';

const MyPageEdit = () => {
  const { data: memberDetail } = useApiQuery(getMemberDetail(), ['member']);
  const { show } = useToast();
  const navigate = useNavigate();
  const [isPending, setPending] = React.useState(false);

  const currentMode =
    (memberDetail?.mode as 'OLD' | 'YOUNG' | undefined) ?? 'YOUNG';

  const handleToggle = async (nextMode: 'OLD' | 'YOUNG') => {
    try {
      setPending(true);
      await updateMemberMode(nextMode).execute();
      if (nextMode === 'OLD') {
        clearAllGuideFlags();
      }
      await queryClient.invalidateQueries({ queryKey: ['member'] });
      show('모드가 변경되었습니다.');
    } catch (e) {
      show('모드 변경에 실패했습니다.', 'error');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <S.Container>
        <S.Header>
          <img src={back} alt="Back" onClick={() => navigate(-1)} />
          <S.HeaderTitle>내 정보 수정</S.HeaderTitle>
        </S.Header>
        <S.ProfileImage src={memberDetail?.profileImageUrl || profile} />
        <S.Nickname>{memberDetail?.nickname || '닉네임 없음'}</S.Nickname>
        <S.HorizontalLine />
        <S.MenuTitle>계정</S.MenuTitle>
        <S.MenuRow style={{ marginBottom: '4.7rem' }}>
          <S.MenuText>이메일</S.MenuText>
          <S.MenuText>{memberDetail?.email || '이메일 없음'}</S.MenuText>
        </S.MenuRow>
        <S.MenuTitle>앱설정</S.MenuTitle>
        <S.MenuRow style={{ marginBottom: '1.7rem' }}>
          <S.MenuText>글씨 크기</S.MenuText>
        </S.MenuRow>
        <S.MenuRow>
          <S.MenuText>모드 바꾸기</S.MenuText>
          <ModeToggle
            value={currentMode}
            onChange={handleToggle}
            loading={isPending}
          />
        </S.MenuRow>
      </S.Container>
    </>
  );
};

export default MyPageEdit;
