// src/LocalInfoShare/Pages/LocalInfoForm.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";
import BackIcon from "../../Styles/Icons/BackIcon";
import { BackIconBox } from "../../Styles/Components/Atoms/BackIconBox";
import BellIcon from "../../Styles/Icons/BellIcon";
import { IconRow } from "../../Styles/Components/Layout/IconRow";

// 아이콘 이미지
import FoodIcon from "../../assets/FoodIcon.svg";
import HospitalIcon from "../../assets/HospitalIcon.svg";
import EtcIcon from "../../assets/EtcIcon.svg";

// 스타일
import {
  Wrapper,
  Container,
  ModalOverlay,
  ModalBox,
  Card,
  CardHeaderBar,
  HeaderLabel,
  HeaderTitleInput,
  CardBody,
  BodyTextarea,
  BodyCounter,
  ButtonRow,
  GhostButton,
  GhostSub,
  SectionTitle,
  RegisterBar,
  RegisterButton,
  HiddenFileInput,
  CategoryArea,
  CategoryIconsRow,
  CatIconImg,
  CategoryButtonsRow,
  CategoryButton,
} from "../Styles/LocalInfoForm.Styles";

type Kind = "food" | "hospital" | "etc";
type LocationState = {
  address?: string;
  coords?: { lat: number; lng: number } | null;
  from?: string;
} | null;

type Draft = {
  title: string;
  detail: string;
  address: string;
  coords: { lat: number; lng: number } | null;
  selected: Kind | null;
  photoUrl: string | null; // 로컬 미리보기 URL
};

const DRAFT_KEY = "localInfoFormDraft";
const API_BASE = "https://api.planhub.site";

/** draft 불러오기 */
function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw)
      return { title: "", detail: "", address: "", coords: null, selected: null, photoUrl: null };
    const p = JSON.parse(raw);
    return {
      title: p?.title ?? "",
      detail: p?.detail ?? "",
      address: p?.address ?? "",
      coords: p?.coords ?? null,
      selected: p?.selected ?? null,
      photoUrl: p?.photoUrl ?? null,
    };
  } catch {
    return { title: "", detail: "", address: "", coords: null, selected: null, photoUrl: null };
  }
}


/** draft 저장 */
function saveDraft(d: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {}
}

/** API enum 매핑 */
function toApiCategory(k: Kind | null): "HOSPITAL_FACILITIES" | "RESTAURANT_CAFE" | "ETC" | null {
  if (k === "hospital") return "HOSPITAL_FACILITIES";
  if (k === "food") return "RESTAURANT_CAFE";
  if (k === "etc") return "ETC";
  return null;
}

/** UI 라벨/색상 매핑 */
function toUiCategory(k: Kind) {
  if (k === "hospital") return { label: "병원/시설", color: "rgba(30,255,0,0.86)" };
  if (k === "food") return { label: "외식/카페", color: "blue" };
  return { label: "기타", color: "rgba(255,115,0,0.86)" };
}

/** 상세 조회 (등록 후 최신 데이터 가져오기) */
async function fetchInformationDetail(id: number, token: string) {
  const res = await fetch(`${API_BASE}/api/v1/informations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`detail failed ${res.status}`);
  return res.json() as Promise<{
    informationId: number;
    title: string;
    description: string;
    category: "HOSPITAL_FACILITIES" | "RESTAURANT_CAFE" | "ETC";
    address: string;
    latitude?: number;
    longitude?: number;
    createdAt?: string;
    images?: { imageId: number; imageUrl: string }[];
  }>;
}

const LocalInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state as LocationState) || null;

  const initial = React.useMemo(loadDraft, []);
  const [title, setTitle] = React.useState(initial.title);
  const [detail, setDetail] = React.useState(initial.detail);
  const [address, setAddress] = React.useState(initial.address);
  const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(initial.coords);
  const [selected, setSelected] = React.useState<Kind | null>(initial.selected);

  // 업로드 상태
  const [photoSizeMB, setPhotoSizeMB] = React.useState(0);
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(initial.photoUrl);
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    if (navState?.from === "LocalInfoAddress") {
      const nextAddress = navState.address ?? "";
      const nextCoords = navState.coords ?? null;
      setAddress(nextAddress);
      setCoords(nextCoords);
      saveDraft({ title, detail, address: nextAddress, coords: nextCoords, selected, photoUrl });
    }
  }, [navState?.from]);

  React.useEffect(() => {
    saveDraft({ title, detail, address, coords, selected, photoUrl });
  }, [title, detail, address, coords, selected, photoUrl]);

  const goAddressSelect = () => {
    saveDraft({ title, detail, address, coords, selected, photoUrl });
    navigate("/localinfoaddress", { replace: false });
  };

  const handleBack = () => {
    saveDraft({ title, detail, address, coords, selected, photoUrl });
    navigate("/LocalInfoShare");
  };

  const onPickPhoto = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (!f) {
      setPhotoUrl(null);
      setPhotoSizeMB(0);
      saveDraft({ title, detail, address, coords, selected, photoUrl: null });
      return;
    }
    setPhotoSizeMB(Math.max(0, f.size / (1024 * 1024)));
    const url = URL.createObjectURL(f);
    setPhotoUrl(url);
    saveDraft({ title, detail, address, coords, selected, photoUrl: url });
  };

  /** 등록 (멀티파트 전송) */
  const handleRegister = async () => {
    if (!title || !detail || !selected || !address) {
      alert("제목, 내용, 주소, 종류를 모두 입력해주세요.");
      return;
    }
    const apiCategory = toApiCategory(selected);
    if (!apiCategory) {
      alert("종류를 선택해주세요.");
      return;
    }

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요해요. 토큰이 없습니다.");
      return;
    }

    try {
      // 1) 멀티파트 본문 구성 (request + images)
      const requestDto = {
        title,
        description: detail,
        address,
        category: apiCategory,
      };

      const form = new FormData();
      form.append("request", new Blob([JSON.stringify(requestDto)], { type: "application/json" }));
      if (file) form.append("images", file); // 파일이 있으면 첨부

      // 2) Content-Type은 넣지 말 것 (브라우저가 boundary 자동 설정)
      const res = await fetch(`${API_BASE}/api/v1/informations`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`create failed (${res.status}) ${t}`);
      }

      // 3) 생성된 ID 파싱
      let id: number | null = null;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const data = await res.json();
        id = typeof data === "number" ? data : Number((data as any)?.id ?? data);
      } else {
        const t = await res.text();
        id = Number(t.trim());
      }

      // 4) 상세 재조회 → 로컬 목록 저장
      let itemToSave: any | null = null;
      if (id && !Number.isNaN(id)) {
        const d = await fetchInformationDetail(id, token);
        const k: Kind =
          d.category === "HOSPITAL_FACILITIES" ? "hospital" :
          d.category === "RESTAURANT_CAFE" ? "food" : "etc";
        const ui = toUiCategory(k);

        itemToSave = {
          informationId: d.informationId,
          title: d.title,
          detail: d.description,
          address: d.address,
          coords: d.latitude && d.longitude ? { lat: d.latitude, lng: d.longitude } : null,
          category: ui.label,
          color: ui.color,
          date: d.createdAt ? new Date(d.createdAt).getTime() : Date.now(),
          photoUrl: d.images && d.images.length > 0 ? d.images[0].imageUrl : null,
        };
      } else {
        // id 파싱 실패 시 임시 저장
        const { label, color } = toUiCategory(selected!);
        itemToSave = {
          informationId: Date.now(),
          title,
          detail,
          address,
          coords,
          category: label,
          color,
          date: Date.now(),
          photoUrl, // 미리보기 URL (임시)
        };
      }

      const stored = JSON.parse(localStorage.getItem("localInfoList") || "[]");
      localStorage.setItem("localInfoList", JSON.stringify([itemToSave, ...stored]));

      setShowModal(true);
      setTimeout(() => setShowModal(false), 800);

      localStorage.removeItem(DRAFT_KEY);
      navigate("/localinfoshare");
    } catch (e) {
      console.error(e);
      alert("등록 중 오류가 발생했어요.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <IconRow>
          <BackIconBox onClick={handleBack}><BackIcon /></BackIconBox>
          <BellIcon />
        </IconRow>

        <Card>
          <CardHeaderBar>
            <HeaderLabel>제목 :</HeaderLabel>
            <HeaderTitleInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              aria-label="제목 입력"
            />
          </CardHeaderBar>

          <CardBody>
            <BodyTextarea
              placeholder="내용을 입력하세요."
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              maxLength={200}
              aria-label="내용 입력"
            />
            <BodyCounter>{detail.length}/200</BodyCounter>
          </CardBody>
        </Card>

        <ButtonRow>
          <GhostButton onClick={onPickPhoto}>
            {photoUrl ? "사진 다시 선택" : "사진 등록하기"}
            <GhostSub>
              {photoUrl ? "선택됨" : `${photoSizeMB ? `${photoSizeMB.toFixed(1)}MB` : "0MB"}`}
            </GhostSub>
          </GhostButton>

          <GhostButton onClick={goAddressSelect}>주소 등록하기</GhostButton>

          <HiddenFileInput
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </ButtonRow>

        <SectionTitle>종류</SectionTitle>
        <CategoryArea>
          <CategoryIconsRow>
            <CatIconImg src={FoodIcon} alt="외식/카페" onClick={() => setSelected("food")} style={{ cursor: "pointer" }} />
            <CatIconImg src={HospitalIcon} alt="병원/시설" onClick={() => setSelected("hospital")} style={{ cursor: "pointer" }} />
            <CatIconImg src={EtcIcon} alt="기타" onClick={() => setSelected("etc")} style={{ cursor: "pointer" }} />
          </CategoryIconsRow>
          <CategoryButtonsRow>
            <CategoryButton $active={selected === "food"} onClick={() => setSelected("food")}>외식/카페</CategoryButton>
            <CategoryButton $active={selected === "hospital"} onClick={() => setSelected("hospital")}>병원/시설</CategoryButton>
            <CategoryButton $active={selected === "etc"} onClick={() => setSelected("etc")}>기타</CategoryButton>
          </CategoryButtonsRow>
        </CategoryArea>

        <RegisterBar>
          <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
        </RegisterBar>

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
