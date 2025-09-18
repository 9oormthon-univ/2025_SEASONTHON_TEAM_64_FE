import React, { useState } from 'react';
import * as S from './MissionBox.styles';
import memu from '../../../assets/admin/menu.svg';
import { useQueryClient } from '@tanstack/react-query';
import { deleteMission } from '../../../apis/mission';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../../../components/toast/Toast';

interface MissionBoxProps {
  id: number;
  description: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const MissionBox = ({ id, description, isOpen, onToggle }: MissionBoxProps) => {
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { show } = useToastContext();

  const handleDeleteMission = (id: number) => {
    deleteMission(id)
      .execute()
      .then(() => {
        show('미션이 삭제되었습니다.', 'info');
        queryClient.invalidateQueries({ queryKey: ['missionList'] });
        setIsDelete(false);
        onToggle(id);
      })
      .catch(() => {
        show('미션 삭제에 실패했습니다. 다시 시도해주세요.', 'error');
        setIsDelete(false);
        onToggle(id);
      });
  };

  return (
    <>
      {isDelete && (
        <S.ModalContainer onClick={() => setIsDelete(false)}>
          <S.DeletePopUp onClick={(e) => e.stopPropagation()}>
            <S.DeleteText>등록된 미션을</S.DeleteText>
            <S.DeleteText>삭제 하시겠습니까?</S.DeleteText>
            <S.DeleteButtonBox>
              <S.DeleteButton isCancel onClick={() => setIsDelete(false)}>
                취소
              </S.DeleteButton>
              <S.DeleteButton onClick={() => handleDeleteMission(id)}>
                확인
              </S.DeleteButton>
            </S.DeleteButtonBox>
          </S.DeletePopUp>
        </S.ModalContainer>
      )}
      <S.Mission key={id}>
        {description}
        <img src={memu} onClick={() => onToggle(id)} />
        {isOpen && (
          <S.MenuBox>
            <S.MenuItem onClick={() => navigate(`/admin/modify/${id}`)}>
              수정하기
            </S.MenuItem>
            <S.MenuDivider />
            <S.MenuItem onClick={() => setIsDelete(true)}>삭제하기</S.MenuItem>
          </S.MenuBox>
        )}
      </S.Mission>
    </>
  );
};

export default MissionBox;
