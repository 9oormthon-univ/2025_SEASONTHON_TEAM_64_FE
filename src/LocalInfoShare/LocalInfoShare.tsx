import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LogoButton } from "../Styles/LogoButton";
import { BottomBar } from "../Styles/BottomBar";
import { AddInfoButton } from "../Styles/AddInfoButton";
import UserIcon from "../Styles/UserIcon";
import { TextBox as RawTextBox, TitleField as RawTitleField } from "../Styles/TextBox";
import PlusIcon from "../Styles/PlusIcon";
import BellIcon from "../Styles/BellIcon";
import HeaderRow from "../Styles/HeaderRow";

interface InfoItem {
  title: string;
  detail: string;
  category: string; // "병원/시설" | "외식/카페" | "기타" 등
  color: string;
  date: number;     // 최신순 정렬 기준 (timestamp)
}

const TextBox = styled(RawTextBox)`font-size: 1rem;`;
const TitleField = styled(RawTitleField)`font-size: 1rem; font-weight: 700;`;

// 필터 타입/라벨
type FilterKey = "ALL" | "HOSPITAL" | "FOOD" | "ETC";
const FILTER_LABEL: Record<FilterKey, string> = {
  ALL: "전체",
  HOSPITAL: "병원/시설",
  FOOD: "외식/카페",
  ETC: "기타",
};
// 카테고리 매칭(저장된 item.category 텍스트 기준)
const matchByFilter = (item: InfoItem, filter: FilterKey) => {
  if (filter === "ALL") return true;
  if (filter === "HOSPITAL") return item.category === "병원/시설";
  if (filter === "FOOD") return item.category === "외식/카페";
  if (filter === "ETC") return item.category === "기타";
  return true;
};

const LocalInfoShare = () => {
  const navigate = useNavigate();
  const [infoList, setInfoList] = useState<InfoItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>("ALL");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("localInfoList");
      const stored = raw ? JSON.parse(raw) : [];
      const safe: InfoItem[] = Array.isArray(stored)
        ? stored.filter(
            (x) =>
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

  return (
    <Wrapper>
      <Container>
        <HeaderRow>
        <LogoButton>로고/아이콘</LogoButton>
        <BellIcon></BellIcon>
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
                <PlusIcon />
                <TagBox style={{ backgroundColor: item.color }}>
                  {item.category}
                </TagBox>
              </RightColumn>
            </RowBox>
          </Card>
        ))}

        <AddInfoRow>
          <AddInfoButton onClick={() => navigate("/LocalInfoForm")}>
            정보 등록
          </AddInfoButton>
        </AddInfoRow>

        <BottomBar />
      </Container>
    </Wrapper>
  );
};

export default LocalInfoShare;

/* ---------------- styled-components ---------------- */
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.05);
  border-radius: 50px;
`;

/** 상단 "최신순 + 필터버튼들" 한 줄 */
const UpdateRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin: 0 12px 10px 12px;
`;

const UpdateList = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #777;
  margin-right: 10px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 6px;
  margin-right: 25px;
`;

// 아주 연한 자두색
const PLUM_ULTRA_LIGHT = "#F8EAF2";

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 6px 10px;
  border-radius: 9999px;
  border: 1px solid ${({ $active }) => ($active ? "#e3c7d7" : "#e5e5e5")};
  background: ${({ $active }) => ($active ? PLUM_ULTRA_LIGHT : "#f4f4f4")};
  color: #333;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
`;

/* 카드/리스트 */
const Card = styled.div`
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  margin: 8px 16px;
  padding: 10px;
`;

const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  flex: 0 0 70px;
  height: 70px;
  border-radius: 20px;
  background-color: #d2d0d0;
  border: 2px solid #000;
  display: grid;
  place-items: center;
`;

const TextColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 19px 20px 0;
`;

const RightColumn = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const TagBox = styled.div`
  padding: 4px 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1;
`;

const AddInfoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const EmptyBox = styled.div`
  margin: 24px 16px 8px;
  padding: 14px 12px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px dashed #e3e3e3;
  color: #888;
  font-size: 0.9rem;
`;
