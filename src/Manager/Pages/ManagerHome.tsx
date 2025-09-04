import React from "react";
import styled from "styled-components";
import BackIcon from "../../Styles/Icons/BackIcon";
import { BackIconBox } from "../../Styles/Components/Atoms/BackIconBox";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";
import BellIcon from "../../Styles/Icons/BellIcon";
import HeaderRow from "../../Styles/Components/Layout/HeaderRow";
import { useNavigate } from "react-router-dom";
import AdminMissionCard from "../Components/AdminMissionCard";

const ManagerHome = () => {
  const navigate = useNavigate();

  const handleSubmit = (text: string) => {
    // TODO: 서버 전송/로컬스토리지 저장 등
    console.log("mission:", text);
  };

  return (
    <Wrapper>
      <Container>
        <HeaderRow>
          <BackIconBox onClick={() => navigate(-1)}>
            <BackIcon />
          </BackIconBox>
          <BellIcon />
        </HeaderRow>

        <MissionBox>
          <MissionTextGray>"오늘의 미션을 등록하세요."</MissionTextGray>
        </MissionBox>

        <AdminMissionCard maxLength={100} onSubmit={handleSubmit} />

        <BottomBar />
      </Container>
    </Wrapper>
  );
};

export default ManagerHome;

const Wrapper = styled.div`
  width: 100%; height: 100vh; background-color: #f9f9f9;
  display: flex; justify-content: center; align-items: center;
`;
const Container = styled.div`
  display: flex; flex-direction: column;
  width: 100%; height: 100%; max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  border-radius: 50px; overflow: hidden;
`;
const MissionBox = styled.div`
  width: 295px; height: 95px; margin: 20px auto;
  background-color: #f5f5f5; border: 2px solid #000; border-radius: 20px;
  display: flex; justify-content: center; align-items: center;
`;
const MissionTextGray = styled.div`
  font-size: 18px; font-weight: bold; color: #888; text-align: center;
  padding: 0 10px; line-height: 1.4;
`;
