import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { LogoButton } from "../../Styles/Components/Atoms/LogoButton";
import BottomNavigation from "../../components/BottomNavigation";
import { AddInfoButton } from "../../Styles/Components/Atoms/AddInfoButton";
import UserIcon from "../../Styles/Icons/UserIcon";
import { TextBox as RawTextBox, TitleField as RawTitleField } from "../../Styles/Text/TextBox";
import BellIcon from "../../Styles/Icons/BellIcon";
import HeaderRow from "../../Styles/Components/Layout/HeaderRow";
import PlusIcon from "../../Styles/Icons/PlusIcon";

import {
  Wrapper,
  Container,
  UpdateRow,
  UpdateList,
  FilterBar,
  FilterButton,
  Card,
  RowBox,
  IconBox,
  TextColumn,
  RightColumn,
  TagBox,
  AddInfoRow,
  EmptyBox,
  ListViewport,
  IconButtonPlain,
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseBtn,
  ModalBadge,
  ModalSection,
  ModalPill,
  ModalMetaRow,
  HeaderLeft,
  HeaderAuthor,
  AvatarCircle,
  ModalText,
  ModalImagePlaceholder,
  AddressBtn,
} from "../Styles/LocalInfoShare.Styles";

/* ===== 타입 ===== */
interface InfoItem {
  title: string;
  detail: string;
  category: string; // "병원/시설" | "외식/카페" | "기타"
  color: string;
  date: number;     // timestamp
  address?: string;
}

type FilterKey = "ALL" | "HOSPITAL" | "FOOD" | "ETC";

/* ===== 상수/유틸 ===== */
const FILTER_LABEL: Record<FilterKey, string> = {
  ALL: "전체",
  HOSPITAL: "병원/시설",
  FOOD: "외식/카페",
  ETC: "기타",
};

const TextBox = RawTextBox;
const TitleField = RawTitleField;

const matchByFilter = (item: InfoItem, filter: FilterKey) => {
  if (filter === "ALL") return true;
  if (filter === "HOSPITAL") return item.category === "병원/시설";
  if (filter === "FOOD") return item.category === "외식/카페";
  if (filter === "ETC") return item.category === "기타";
  return true;
};

const fmtDate = (ts: number) => {
  try {
    const d = new Date(ts);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  } catch {
    return "";
  }
};

const LocalInfoShare: React.FC = () => {
  const navigate = useNavigate();

  const [infoList, setInfoList] = useState<InfoItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>("ALL");

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<InfoItem | null>(null);

  // 로컬스토리지에서 전체 로드
  useEffect(() => {
    try {
      const raw = localStorage.getItem("localInfoList");
      const stored = raw ? JSON.parse(raw) : [];
      const safe: InfoItem[] = Array.isArray(stored)
        ? stored.filter(
            (x: any) =>
              x &&
              typeof x.title === "string" &&
              typeof x.detail === "string" &&
              typeof x.category === "string" &&
              typeof x.color === "string" &&
              typeof x.date === "number"
          )
        : [];
      setInfoList(safe);
    } catch {
      setInfoList([]);
    }
  }, []);

  // 필터 + 최신순 정렬
  const viewList = useMemo(() => {
    return [...infoList]
      .filter((it) => matchByFilter(it, filter))
      .sort((a, b) => b.date - a.date);
  }, [infoList, filter]);

  const openModal = useCallback((item: InfoItem) => {
    setSelected(item);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelected(null);
  }, []);

  return (
    <Wrapper>
      <Container>
        <HeaderRow>
          <LogoButton>로고/아이콘</LogoButton>
          <BellIcon />
        </HeaderRow>

        <UpdateRow>
          <FilterBar>
            {(["ALL", "HOSPITAL", "FOOD", "ETC"] as FilterKey[]).map((key) => (
              <FilterButton
                key={key}
                type="button"
                aria-pressed={filter === key}
                $active={filter === key}
                onClick={() => setFilter(key)}
                title={`${FILTER_LABEL[key]} 보기`}
              >
                {FILTER_LABEL[key]}
              </FilterButton>
            ))}
          </FilterBar>
          <UpdateList>최신순</UpdateList>
        </UpdateRow>

        {/* 이 박스만 스크롤 */}
        <ListViewport role="region" aria-label="정보 목록">
          {viewList.length === 0 && <EmptyBox>표시할 항목이 없습니다.</EmptyBox>}

          {viewList.map((item, idx) => (
            <Card key={`${item.title}-${item.date}-${idx}`}>
              <RowBox>
                <IconBox>
                  <UserIcon />
                </IconBox>

                <TextColumn>
                  <TextBox>{item.detail}</TextBox>
                  <TitleField>{item.title}</TitleField>
                </TextColumn>

                <RightColumn>
                  <IconButtonPlain aria-label="상세 보기" onClick={() => openModal(item)}>
                    <PlusIcon />
                  </IconButtonPlain>
                  <TagBox style={{ backgroundColor: item.color }}>{item.category}</TagBox>
                </RightColumn>
              </RowBox>
            </Card>
          ))}
        </ListViewport>

        <AddInfoRow>
          {/* ✅ 라우트 경로 소문자로 통일 */}
          <AddInfoButton onClick={() => navigate("/local-info-form")}>정보 등록</AddInfoButton>
        </AddInfoRow>

        <BottomNavigation />
      </Container>

      {/* ===== 모달 ===== */}
      {isOpen && selected && (
        <ModalBackdrop role="presentation" onClick={closeModal}>
          <ModalContainer
            role="dialog"
            aria-modal="true"
            aria-labelledby="infoModalTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <HeaderLeft>
                <AvatarCircle>
                  <UserIcon />
                </AvatarCircle>
                <HeaderAuthor>작성자</HeaderAuthor>
              </HeaderLeft>

              <ModalCloseBtn onClick={closeModal} aria-label="닫기">
                ✕
              </ModalCloseBtn>
            </ModalHeader>

            <ModalBody>
              <ModalSection>
                <ModalPill id="infoModalTitle">제목 : {selected.title}</ModalPill>
              </ModalSection>

              <ModalSection>
                <ModalText>{selected.detail || "내용"}</ModalText>
              </ModalSection>

              <ModalSection>
                <ModalImagePlaceholder>이미지</ModalImagePlaceholder>
              </ModalSection>

              <ModalMetaRow>
                <div>작성일 : {fmtDate(selected.date)}</div>
                <div>
                  <ModalBadge style={{ backgroundColor: selected.color }}>
                    {selected.category}
                  </ModalBadge>
                  <AddressBtn
                    onClick={() => {
                      if (!selected?.address) return alert("저장된 주소가 없습니다.");
                      // ✅ 경로 소문자
                      navigate("/localinfomap", {
                        state: {
                          address: selected.address,
                          title: selected.title,
                          category: selected.category,
                          color: selected.color,
                        },
                      });
                    }}
                  >
                    주소 찾기
                  </AddressBtn>
                </div>
              </ModalMetaRow>
            </ModalBody>

            <ModalFooter />
          </ModalContainer>
        </ModalBackdrop>
      )}
    </Wrapper>
  );
};

export default LocalInfoShare;
