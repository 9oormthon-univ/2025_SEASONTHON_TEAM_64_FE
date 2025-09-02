import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LogoButton } from "../../Styles/Components/Atoms/LogoButton";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";
import { AddInfoButton } from "../../Styles/Components/Atoms/AddInfoButton";
import UserIcon from "../../Styles/Icons/UserIcon";
import { TextBox as RawTextBox, TitleField as RawTitleField } from "../../Styles/Text/TextBox";
import BellIcon from "../../Styles/Icons/BellIcon";
import HeaderRow from "../../Styles/Components/Layout/HeaderRow";

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
} from "../Styles/LocalInfoShare.Styles";

interface InfoItem {
  title: string;
  detail: string;
  category: string; // "병원/시설" | "외식/카페" | "기타"
  color: string;
  date: number;     // timestamp
  address?: string; // (선택) 주소
}

const TextBox = RawTextBox;
const TitleField = RawTitleField;

// 필터 타입/라벨
type FilterKey = "ALL" | "HOSPITAL" | "FOOD" | "ETC";
const FILTER_LABEL: Record<FilterKey, string> = {
  ALL: "전체",
  HOSPITAL: "병원/시설",
  FOOD: "외식/카페",
  ETC: "기타",
};

const matchByFilter = (item: InfoItem, filter: FilterKey) => {
  if (filter === "ALL") return true;
  if (filter === "HOSPITAL") return item.category === "병원/시설";
  if (filter === "FOOD") return item.category === "외식/카페";
  if (filter === "ETC") return item.category === "기타";
  return true;
};

const LocalInfoShare: React.FC = () => {
  const navigate = useNavigate();
  const [infoList, setInfoList] = useState<InfoItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>("ALL");

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
    return [...infoList].filter((it) => matchByFilter(it, filter)).sort((a, b) => b.date - a.date);
  }, [infoList, filter]);

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
                {/* 우상단 태그 */}
                <TagBox style={{ backgroundColor: item.color }}>{item.category}</TagBox>
              </RightColumn>
            </RowBox>
          </Card>
        ))}

        <AddInfoRow>
          <AddInfoButton onClick={() => navigate("/LocalInfoForm")}>정보 등록</AddInfoButton>
        </AddInfoRow>

        <BottomBar />
      </Container>
    </Wrapper>
  );
};

export default LocalInfoShare;
