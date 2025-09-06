import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  AddressBox,
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

type LocationState = {
  address?: string;
  coords?: { lat: number; lng: number } | null;
  from?: string; // "LocalInfoAddress"
} | null;

type Draft = {
  title: string;
  detail: string;
  address: string;
  coords: { lat: number; lng: number } | null;
  selected: Kind | null;
};

const DRAFT_KEY = "localInfoFormDraft";

/** draft 불러오기 */
function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { title: "", detail: "", address: "", coords: null, selected: null };
    const parsed = JSON.parse(raw);
    return {
      title: parsed?.title ?? "",
      detail: parsed?.detail ?? "",
      address: parsed?.address ?? "",
      coords: parsed?.coords ?? null,
      selected: parsed?.selected ?? null,
    };
  } catch {
    return { title: "", detail: "", address: "", coords: null, selected: null };
  }
}

/** draft 저장 */
function saveDraft(d: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {}
}

const LocalInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state as LocationState) || null;

  // 1) 초깃값: localStorage draft 로딩
  const initial = React.useMemo(loadDraft, []);
  const [title, setTitle] = React.useState<string>(initial.title);
  const [detail, setDetail] = React.useState<string>(initial.detail);
  const [address, setAddress] = React.useState<string>(initial.address);
  const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(initial.coords);
  const [selected, setSelected] = React.useState<Kind | null>(initial.selected);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  // 2) 주소 선택에서 돌아왔으면 주소/좌표만 덮어쓰기 → 바로 저장
  React.useEffect(() => {
    if (navState?.from === "LocalInfoAddress") {
      const nextAddress = navState.address ?? "";
      const nextCoords = navState.coords ?? null;
      setAddress(nextAddress);
      setCoords(nextCoords);
      saveDraft({
        title,
        detail,
        address: nextAddress,
        coords: nextCoords,
        selected,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navState?.from]);

  // 3) 값 변경 시 드래프트 자동 저장
  React.useEffect(() => {
    saveDraft({ title, detail, address, coords, selected });
  }, [title, detail, address, coords, selected]);

  // 4) 이동 직전 강제 저장(타이밍 이슈 방지)
  const goAddressSelect = () => {
    saveDraft({ title, detail, address, coords, selected });
    navigate("/localinfoaddress", { replace: false });
  };

  const handleBack = () => {
    saveDraft({ title, detail, address, coords, selected });
    navigate('/LocalInfoShare');
  };

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
      } else if (selected === "triangle") {
        category = "외식/카페";
        color = "blue";
      } else if (selected === "square") {
        category = "기타";
        color = "rgba(255,115,0,0.86)";
      }

      const newItem = {
        title,
        detail,
        address,
        coords,
        category,
        color,
        date: Date.now(),
      };

      // ✅ 전체 유지(자르지 않음). 필요시 큰 상한만 두고 싶으면 .slice(0, 500) 등으로 제한.
      const stored = JSON.parse(localStorage.getItem("localInfoList") || "[]");
      const updated = [newItem, ...stored];
      // const updated = [newItem, ...stored].slice(0, 500);
      localStorage.setItem("localInfoList", JSON.stringify(updated));

      // 제출 후 드래프트 초기화
      localStorage.removeItem(DRAFT_KEY);

      // 경로는 소문자 통일
      navigate("/localinfoshare");
    }, 800);
  };

  return (
    <Wrapper>
      <Container>
        <IconRow>
          <BackIconBox onClick={handleBack}>
            <BackIcon />
          </BackIconBox>
          <BellIcon />
        </IconRow>

        <TitleInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />

        <DetailBox>
          <DetailInput
            placeholder="내용을 입력하세요."
            value={detail}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(e.target.value)}
            maxLength={100}
          />
          <CharCounter>{detail.length}/100</CharCounter>
        </DetailBox>

        {/* 주소: 텍스트 박스(클릭 시 주소 선택 화면으로 이동) */}
        <AddressBox
          role="button"
          tabIndex={0}
          aria-label="주소 등록하기"
          $isEmpty={!address}
          onClick={goAddressSelect}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goAddressSelect();
          }}
        >
          {address || "주소를 입력하세요."}
        </AddressBox>

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
