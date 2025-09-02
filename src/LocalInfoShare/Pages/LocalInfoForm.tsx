import React from "react";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";
import { Circle, Triangle, Square } from "lucide-react";
import BackIcon from "../../Styles/Icons/BackIcon";
import { BackIconBox } from "../../Styles/Components/Atoms/BackIconBox";
import BellIcon from "../../Styles/Icons/BellIcon";
import { IconRow } from "../../Styles/Components/Layout/IconRow";
import { AddInfoButton } from "../../Styles/Components/Atoms/AddInfoButton";

import {
  Wrapper,
  Container,
  TitleInput,
  DetailBox,
  DetailInput,
  CharCounter,
  AddressInput,
  ContentArea,
  ContentBox,
  TypeArea,
  TypeButton,
  UserCircle,
  UserTriangle,
  UserSquare,
  AddInfoBox,
  ModalOverlay,
  ModalBox,
} from "../Styles/LocalInfoForm.Styles";

type Kind = "circle" | "triangle" | "square";

const LocalInfoForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [detail, setDetail] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>(""); // ✅ 주소는 별도 상태
  const [selected, setSelected] = React.useState<Kind | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
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

      // address는 저장만(표시는 나중에 필요할 때)
      const newItem = { title, detail, address, category, color, date: Date.now() };

      const stored = JSON.parse(localStorage.getItem("localInfoList") || "[]");
      const updated = [newItem, ...stored].slice(0, 4);

      localStorage.setItem("localInfoList", JSON.stringify(updated));

      navigate("/LocalInfoShare");
    }, 800);
  };

  return (
    <Wrapper>
      <Container>
        <IconRow>
          <BackIconBox onClick={() => navigate(-1)}>
            <BackIcon />
          </BackIconBox>
          <BellIcon />
        </IconRow>

        <TitleInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />

        {/* ▶ 내용 입력 + 글자 수 카운터 */}
        <DetailBox>
          <DetailInput
            placeholder="내용을 입력하세요."
            value={detail}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(e.target.value)}
            maxLength={100}
          />
          <CharCounter>{detail.length}/100</CharCounter>
        </DetailBox>

        <AddressInput
          placeholder="주소를 등록하세요."
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        />

        <ContentArea>
          <ContentBox>종류</ContentBox>
        </ContentArea>

        <TypeArea>
          <TypeButton onClick={() => setSelected("circle")}>
            <UserCircle $active={selected === "circle"} as={Circle} />
          </TypeButton>

          <TypeButton onClick={() => setSelected("triangle")}>
            <UserTriangle $active={selected === "triangle"} as={Triangle} />
          </TypeButton>

          <TypeButton onClick={() => setSelected("square")}>
            <UserSquare $active={selected === "square"} as={Square} />
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
