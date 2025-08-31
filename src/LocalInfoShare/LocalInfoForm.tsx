import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../Styles/BottomBar";
import { Circle, Triangle, Square } from "lucide-react";
import BackIcon from "../Styles/BackIcon";
import { BackIconBox } from "../Styles/BackIconBox";
import BellIcon from "../Styles/BellIcon";
import { IconRow } from "../Styles/IconRow";

const LocalInfoForm = () => {
  const [title, setTitle] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [selected, setSelected] = React.useState<"circle" | "triangle" | "square" | null>(null);

  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!title || !detail || !selected) {
      alert("제목, 내용, 종류를 모두 입력해주세요.");
      return;
    }

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);

      let category = "";
      let color = "";
      if (selected === "circle") {
        category = "병원/시설";
        color = "rgba(30,255,0,0.86)";
      }
      if (selected === "triangle") {
        category = "외식/카페";
        color = "blue";
      }
      if (selected === "square") {
        category = "기타";
        color = "rgba(255,115,0,0.86)";
      }

      const newItem = { title, detail, category, color, date: Date.now() };

      const stored = JSON.parse(localStorage.getItem("localInfoList") || "[]");
      const updated = [newItem, ...stored].slice(0, 4);

      localStorage.setItem("localInfoList", JSON.stringify(updated));

      navigate("/LocalInfoShare");
    }, 1000);
  };

  return (
    <Wrapper>
      <Container>
       <IconRow>
        <BackIconBox onClick={() => navigate(-1)}>

          <BackIcon></BackIcon>
          </BackIconBox>
          <BellIcon></BellIcon>
        </IconRow>

        <TitleInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DetailInput
          placeholder="내용을 입력하세요."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <AddressInput
          placeholder="주소를 등록하세요."
          value={title}
        />
        <ContentArea>
          <ContentBox>종류</ContentBox>
        </ContentArea>

        <TypeArea>
          <TypeButton onClick={() => setSelected("circle")}>
            <UserCircle $active={selected === "circle"} />
          </TypeButton>

          <TypeButton onClick={() => setSelected("triangle")}>
            <UserTriangle $active={selected === "triangle"} />
          </TypeButton>

          <TypeButton onClick={() => setSelected("square")}>
            <UserSquare $active={selected === "square"} />
          </TypeButton>
        </TypeArea>

        <AddInfoBox>
          <AddInfoButton onClick={handleRegister}>정보 등록</AddInfoButton>
        </AddInfoBox>

        <BottomBar />
      </Container>

      {showModal && (
        <ModalOverlay>
          <ModalBox>내 정보가 등록되었습니다.</ModalBox>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};
export default LocalInfoForm;

/* styled-components ----------------- */
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  border-radius: 50px;
  position: relative;
`;

const TitleInput = styled.input`
  width: 310px;
  margin: 0 auto 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 2px solid #000;
  &::placeholder { color:#000; font-weight:700; }
`;
const AddressInput = styled.input`
  width: 310px;
  margin: 0 auto 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 2px solid #000;
  &::placeholder { color:#000; font-weight:700; }
`;

const DetailInput = styled.textarea`
  width: 267px;
  height: 120px;
  margin: 0 auto 20px;
  padding: 16px 20px;
  font-size: 16px;
  border: 2px solid #bdbdbd;
  background-color: rgba(249,249,249,0.49);
  border-radius: 20px;
  resize: none;
  &::placeholder { color:#000; font-size:16px; }
`;

const ContentArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const ContentBox = styled.div`
  display: flex; align-items:center; justify-content:center;
  width: 100px; height: 50px;
`;

const TypeArea = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const TypeButton = styled.button`
  width: 80px; height: 60px;
  border: 2px solid rgba(207,185,185,0.49);
  background: none;
  border-radius: 20px;
  display: grid; place-items: center;
  cursor: pointer;
`;

interface ActiveProp {
  $active: boolean;
}

const UserCircle = styled(Circle)<ActiveProp>`
  width: 40px; height: 40px;
  fill: rgba(30,255,0,0.86);
  stroke: ${({ $active }) => ($active ? "red" : "none")};
`;

const UserTriangle = styled(Triangle)<ActiveProp>`
  width: 40px; height: 40px;
  fill: blue;
  stroke: ${({ $active }) => ($active ? "red" : "none")};
`;

const UserSquare = styled(Square)<ActiveProp>`
  width: 40px; height: 40px;
  fill: rgba(255,115,0,0.86);
  stroke: ${({ $active }) => ($active ? "red" : "none")};
`;

const AddInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
  width: 100%;
`;

const AddInfoButton = styled.button`
  width: 140px;
  height: 40px;
  background-color: white;
  border:1px solid black;
  display:block;
  border-radius: 15px;
  cursor: pointer;
`;

/* 모달 ----------------- */
const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;
