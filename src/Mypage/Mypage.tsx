import React from "react";
import styled from "styled-components";
import { LogoButton } from "../Styles/LogoButton";
import { BottomBar } from "../Styles/BottomBar";
import { User } from "lucide-react";
import BellIcon from "../Styles/BellIcon";
import HeaderRow from "../Styles/HeaderRow";

const Mypage = () => {
  return (
    <Wrapper>
      <Container>
        <HeaderRow>
          <LogoButton>로고/아이콘</LogoButton>
          <BellIcon></BellIcon>
        </HeaderRow>

        <TopBox>
          <IconBox><UserIcon /></IconBox>
          <NameText>이름</NameText>
          <UpdateText>내 정보 수정하기</UpdateText>
        </TopBox>

        <CenterColumn>
          <CardButton>내가 쓴 글</CardButton>
          <CardButton>공감 / 댓글 확인</CardButton>
        </CenterColumn>

        <FortuneCookieButton>포춘쿠키 모아보기</FortuneCookieButton>
        <BottomBar />
      </Container>
    </Wrapper>
  );
};

export default Mypage;

/* styled-components ----------------- */
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex; flex-direction: column;
  width: 100%; height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  border-radius: 50px;
`;

const TopBox = styled.div`
  display: flex; flex-direction: row; align-items: center;
  width: 302px; height: 168px;
  background-color: #eee; border:1px solid #000;
  margin: 0 auto; border-radius: 15px;
`;

const NameText = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 1rem 1.5625rem 5rem 0.5rem;
  white-space: nowrap;
`;

const UpdateText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 4.0625rem;
`;

const IconBox = styled.div`
  width: 94px; height: 98px;
  border-radius: 20px; background-color: #d2d0d0;
  border:2px solid #000; margin-left: 20px;
  display: grid; place-items: center;
`;

const UserIcon = styled(User)`
  width: 70px; height: 70px; stroke: #000;
`;

const CenterColumn = styled.div`
  display: flex; flex-direction: row; justify-content: center; align-items: center;
  margin-top: 20px; gap: 20px;
`;

const CardButton = styled.button`
  width: 140px; height: 135px;
  background-color: #fff; border:1px solid #000; border-radius: 15px;
  font-size: 1rem;
`;

const FortuneCookieButton = styled.button`
  width: 295px; height: 225px;
  background-color: #fff; border:1px solid #000; border-radius: 15px;
  display:block; margin: 20px auto 0;
  font-size: 1rem;
`;
