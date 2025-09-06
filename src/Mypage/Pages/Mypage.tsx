import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderRow from "../../Styles/Components/Layout/HeaderRow";
import { LogoButton } from "../../Styles/Components/Atoms/LogoButton";
import BellIcon from "../../Styles/Icons/BellIcon";
import BottomNavigation from "../../components/BottomNavigation";

import {
  Wrapper,
  Container,
  TopBox,
  IconBox,
  UserIcon,
  NameText,
  UpdateText,
  CenterRow,
  CardButton,
  FortuneCookieButton,
} from "../Styles/Mypage.Styles";

const Mypage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <HeaderRow>
          <LogoButton>로고/아이콘</LogoButton>
          <BellIcon />
        </HeaderRow>

        <TopBox>
          <IconBox>
            <UserIcon />
          </IconBox>
          <div>
            <NameText>이름</NameText>
            <UpdateText>내 정보 수정하기</UpdateText>
          </div>
        </TopBox>

        <CenterRow>
          <CardButton type="button">내가 쓴 글</CardButton>
          <CardButton type="button" onClick={() => navigate("/LocalInfoShare")}>내가 공유한 정보</CardButton>
        </CenterRow>

        <FortuneCookieButton
          type="button"
          onClick={() => navigate("/CookieDetailPage")}
          aria-label="포춘쿠키 모아보기"
        >
          포춘쿠키 모아보기
        </FortuneCookieButton>

        <BottomNavigation />
      </Container>
    </Wrapper>
  );
};

export default Mypage;
