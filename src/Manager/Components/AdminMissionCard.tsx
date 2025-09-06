import React, { useState } from "react";
import UserIcon from "../../Styles/Icons/UserIcon";
import { AddInfoButton } from "../../Styles/Components/Atoms/AddInfoButton";
import * as S from "../Styles/AdminMissionCard.styles";

type Props = {
  defaultValue?: string;
  maxLength?: number;        
  onSubmit?: (text: string) => void;
};

const AdminMissionCard: React.FC<Props> = ({
  defaultValue = "",
  maxLength = 100,
  onSubmit,
}) => {
  const [text, setText] = useState(defaultValue);

  return (
    <>
      <S.Card>
        <S.Header>
          <S.IconBox><UserIcon /></S.IconBox>
          <S.AdminLabel>관리자</S.AdminLabel>
        </S.Header>

        <S.Inner>
          {text === "" && <S.FakePlaceholder>오늘의 미션 작성</S.FakePlaceholder>}
          <S.Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={maxLength}
          />
          <S.Counter>{text.length}/{maxLength}</S.Counter>
        </S.Inner>
      </S.Card>

      <S.ButtonRow>
        <AddInfoButton onClick={() => onSubmit?.(text)}>등록하기</AddInfoButton>
      </S.ButtonRow>
    </>
  );
};

export default AdminMissionCard;
