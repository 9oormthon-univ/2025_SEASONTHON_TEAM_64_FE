// src/LocalInfoShare/Pages/LocalInfoShare.tsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { LogoButton } from "../../Styles/Components/Atoms/LogoButton";
import { BottomBar } from "../../Styles/Components/Navigation/BottomBar";
import { AddInfoButton } from "../../Styles/Components/Atoms/AddInfoButton";
import { TextBox as RawTextBox, TitleField as RawTitleField } from "../../Styles/Text/TextBox";
import BellIcon from "../../Styles/Icons/BellIcon";
import HeaderRow from "../../Styles/Components/Layout/HeaderRow";
import PlusIcon from "../../Styles/Icons/PlusIcon";

import {
  Wrapper, Container, UpdateRow, UpdateList, FilterBar, FilterButton, Card, RowBox,
  IconBox, TextColumn, RightColumn, TagBox, AddInfoRow, EmptyBox, ListViewport,
  IconButtonPlain, ThumbDiv, ThumbFallback,
  ModalBackdrop, ModalShell, ModalHeaderRow, AvatarCircle, NameCol, Nickname, Handle,
  ModalCloseBtn, TitleBar, TitleLabel, TitleText, ContentCard, ContentText, ContentDate,
  AddressRow, AddressDot, AddressLink, CategoryBadgeLarge
} from "../Styles/LocalInfoShare.Styles";

import {
  getInformation,
  listInformations,
  type InformationListItem,
  type InformationDetail,
  type InformationCategory,
} from "../api/Information";

/* ===== 카테고리 매핑 ===== */
type ServerCategory = InformationCategory;
const CATEGORY_LABEL: Record<ServerCategory, "병원/시설" | "외식/카페" | "기타"> = {
  HOSPITAL_FACILITIES: "병원/시설",
  RESTAURANT_CAFE: "외식/카페",
  ETC: "기타",
};
const CATEGORY_COLOR: Record<ServerCategory, string> = {
  HOSPITAL_FACILITIES: "#4CAF50",
  RESTAURANT_CAFE: "#FF9800",
  ETC: "#9E9E9E",
};

const API_BASE = "https://api.planhub.site";

type FilterKey = "ALL" | "HOSPITAL" | "FOOD" | "ETC";
const FILTER_LABEL: Record<FilterKey, string> = {
  ALL: "전체",
  HOSPITAL: "병원/시설",
  FOOD: "외식/카페",
  ETC: "기타",
};

interface ListItem {
  rowId: string;
  serverId?: number | null;  // 서버 id (없으면 로컬)
  isLocal: boolean;
  title: string;
  detail: string;
  categoryLabel: "병원/시설" | "외식/카페" | "기타";
  color: string;
  date: number | string;
  address?: string;
  photoUrl?: string | null;  // 목록에서 넘어오거나, 로컬 초안 저장된 썸네일
  nickname?: string;
}

const TextBox = RawTextBox;
const TitleField = RawTitleField;

const matchByFilter = (item: ListItem, f: FilterKey) =>
  f === "ALL" ||
  (f === "HOSPITAL" && item.categoryLabel === "병원/시설") ||
  (f === "FOOD" && item.categoryLabel === "외식/카페") ||
  (f === "ETC" && item.categoryLabel === "기타");

const fmtDate = (ts: number | string) => {
  const d = new Date(ts);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const toDetailFromLocal = (item: ListItem): InformationDetail => ({
  informationId: item.serverId ?? 0,
  title: item.title,
  description: item.detail,
  category:
    (Object.keys(CATEGORY_LABEL) as ServerCategory[]).find(
      (k) => CATEGORY_LABEL[k] === item.categoryLabel
    ) ?? "ETC",
  address: item.address ?? "",
  latitude: 0 as any,
  longitude: 0 as any,
  createdAt: typeof item.date === "number" ? new Date(item.date).toISOString() : item.date,
  writer: { memberId: 0, nickname: item.nickname || "로컬 초안" },
  images: item.photoUrl ? [{ imageId: 0, imageUrl: item.photoUrl }] : [],
});

/* ====== ★ 로컬스토리지 정리: 서버에 없는 ID(404) 제거 ====== */
async function cleanupLocalInfoListOnce() {
  const KEY = "localInfoList";
  const token = sessionStorage.getItem("accessToken") || undefined;

  const raw = localStorage.getItem(KEY);
  if (!raw) return;

  let arr: any[];
  try { arr = JSON.parse(raw); } catch { return; }
  if (!Array.isArray(arr)) return;

  const keep: any[] = [];
  for (const it of arr) {
    const id = Number(it?.informationId);
    // 서버 ID가 없으면(로컬 초안) 유지
    if (!Number.isFinite(id)) { keep.push(it); continue; }

    try {
      const res = await fetch(`${API_BASE}/api/v1/informations/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (res.ok) {
        keep.push(it); // 서버에 존재 → 유지
      } else if (res.status === 404) {
        // 존재하지 않음 → 버림
        // console.info("purged ID:", id);
      } else {
        // 일시 오류 → 일단 유지
        keep.push(it);
      }
    } catch {
      // 네트워크 실패 → 일단 유지
      keep.push(it);
    }
  }

  localStorage.setItem(KEY, JSON.stringify(keep));
}

const LocalInfoShare: React.FC = () => {
  const navigate = useNavigate();

  const [infoList, setInfoList] = useState<ListItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>("ALL");

  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState<InformationDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  // 편집 모드 & 편집 필드
  const [editMode, setEditMode] = useState(false);
  const [eTitle, setETitle] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [eAddress, setEAddress] = useState("");
  const [eFile, setEFile] = useState<File | null>(null);

  const notFoundIdsRef = useRef<Set<number>>(new Set());

  // 썸네일 캐시 (serverId -> imageUrl|null)
  const [thumbMap, setThumbMap] = useState<Record<number, string | null>>({});
  const inflightThumbs = useRef<Set<number>>(new Set());

  /* 1) 로컬 초안 로드 */
  const loadLocalDrafts = useCallback((): ListItem[] => {
    try {
      const raw = localStorage.getItem("localInfoList");
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr
        .filter((x: any) => x && typeof x.title === "string")
        .map((x: any, i: number): ListItem => {
          const hasServerId =
            typeof x.informationId === "number" && Number.isFinite(x.informationId);
          const label = (x.category as ListItem["categoryLabel"]) ?? "기타";
          const key =
            (Object.keys(CATEGORY_LABEL) as ServerCategory[]).find(
              (k) => CATEGORY_LABEL[k] === label
            ) ?? "ETC";
          return {
            rowId: `${x.informationId ?? `local-${x.date ?? Date.now()}-${i}`}`,
            serverId: hasServerId ? x.informationId : null,
            isLocal: !hasServerId,
            title: x.title,
            detail: x.detail,
            categoryLabel: CATEGORY_LABEL[key],
            color: CATEGORY_COLOR[key],
            date: x.date ?? Date.now(),
            address: x.address,
            photoUrl: x.photoUrl ?? null,
            nickname: x.nickname ?? undefined,
          };
        });
    } catch {
      return [];
    }
  }, []);

  /* 2) 서버 목록 로드 */
  const loadServerList = useCallback(async (): Promise<ListItem[]> => {
    const list: InformationListItem[] = await listInformations();
    return list.map((it) => {
      const cat = (it.category as ServerCategory) ?? "ETC";
      return {
        rowId: `srv-${it.informationId}`,
        serverId: it.informationId,
        isLocal: false,
        title: it.title,
        detail: it.description,
        categoryLabel: CATEGORY_LABEL[cat],
        color: CATEGORY_COLOR[cat],
        date: it.createdAt,
        address: it.address,
        photoUrl: it.images?.[0]?.imageUrl ?? null,
        nickname: it.writer?.nickname,
      };
    });
  }, []);

  /* 3) 마운트: ★ 정리 → 병합 + 방금 만든 글 자동 열기 */
  useEffect(() => {
    (async () => {
      // ★ 먼저 로컬 정리
      await cleanupLocalInfoListOnce();

      const localDrafts = loadLocalDrafts();
      try {
        const serverItems = await loadServerList();
        const byKey = new Map<string, ListItem>();
        [...localDrafts, ...serverItems].forEach((item) => {
          const key = item.serverId ? `srv-${item.serverId}` : item.rowId;
          byKey.set(key, item);
        });
        const merged = Array.from(byKey.values()).sort((a, b) => {
          const ta = typeof a.date === "number" ? a.date : Date.parse(a.date);
          const tb = typeof b.date === "number" ? b.date : Date.parse(b.date);
          return tb - ta;
        });
        setInfoList(merged);
      } catch {
        setInfoList(
          localDrafts.sort((a, b) => {
            const ta = typeof a.date === "number" ? a.date : Date.parse(a.date);
            const tb = typeof b.date === "number" ? b.date : Date.parse(b.date);
            return tb - ta;
          })
        );
      }

      // 방금 등록한 글 자동 상세 열기(선택)
      const just = sessionStorage.getItem("lastCreatedInformationId");
      if (just) {
        sessionStorage.removeItem("lastCreatedInformationId");
        const id = Number(just);
        setIsOpen(true);
        setLoading(true);
        setLoadErr(null);
        try {
          const res = await getInformation(id);
          setDetail(res);
        } catch {
          /* 무시 */
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [loadLocalDrafts, loadServerList]);

  const viewList = useMemo(
    () => infoList.filter((it) => matchByFilter(it, filter)),
    [infoList, filter]
  );

  /* 3.5) 썸네일 보강: photoUrl 없는 서버 항목에 대해 상세 1회 호출해서 캐시 */
  useEffect(() => {
    const targets = viewList
      .filter(
        (it) =>
          !it.isLocal &&
          it.serverId &&
          !it.photoUrl &&
          thumbMap[it.serverId] === undefined
      )
      .map((it) => it.serverId!)
      .filter((id) => !inflightThumbs.current.has(id));

    if (targets.length === 0) return;

    targets.forEach((id) => inflightThumbs.current.add(id));
    (async () => {
      const entries: Array<[number, string | null]> = [];
      for (const id of targets) {
        try {
          const d = await getInformation(id);
          const url =
            d.images && d.images.length > 0 ? d.images[0].imageUrl : null;
          entries.push([id, url]);
        } catch {
          entries.push([id, null]);
        } finally {
          inflightThumbs.current.delete(id);
        }
      }
      if (entries.length) {
        setThumbMap((prev) => {
          const next = { ...prev };
          for (const [id, url] of entries) next[id] = url;
          return next;
        });
      }
    })();
  }, [viewList, thumbMap]);

  /* 4) 카드 클릭 → 모달 열기 */
  const openDetail = useCallback(async (item: ListItem) => {
    setIsOpen(true);
    setEditMode(false);
    setLoading(true);
    setLoadErr(null);
    setDetail(null);
    setEFile(null);

    if (item.serverId && notFoundIdsRef.current.has(item.serverId)) {
      const d = toDetailFromLocal(item);
      setDetail(d);
      setETitle(d.title);
      setEDesc(d.description);
      setEAddress(d.address ?? "");
      setLoading(false);
      return;
    }

    try {
      if (!item.isLocal && item.serverId) {
        const res = await getInformation(item.serverId);
        setDetail(res);
        setETitle(res.title);
        setEDesc(res.description);
        setEAddress(res.address ?? "");
      } else {
        const d = toDetailFromLocal(item);
        setDetail(d);
        setETitle(d.title);
        setEDesc(d.description);
        setEAddress(d.address ?? "");
      }
    } catch (e: any) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.message;
      if (status === 404 && item.serverId) {
        notFoundIdsRef.current.add(item.serverId);
        const d = toDetailFromLocal(item);
        setDetail(d);
        setLoadErr(msg || "정보나눔 피드를 찾을 수 없습니다.");
      } else {
        setLoadErr(msg || "상세 정보를 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setDetail(null);
    setLoadErr(null);
    setEditMode(false);
    setEFile(null);
  }, []);

  const goAddress = useCallback(() => {
    if (!detail?.address) return alert("저장된 주소가 없습니다.");
    const cat = (detail.category as ServerCategory) ?? "ETC";
    navigate("/localinfomap", {
      state: {
        address: detail.address,
        title: detail.title,
        category: CATEGORY_LABEL[cat],
        color: CATEGORY_COLOR[cat],
      },
    });
  }, [detail, navigate]);

  const firstImage = detail?.images?.[0]?.imageUrl;

  /* ===== 수정 저장 ===== */
  const handleSave = useCallback(async () => {
    if (!detail) return;
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    setLoadErr(null);

    try {
      const form = new FormData();
      const request = {
        title: eTitle.trim(),
        description: eDesc.trim(),
        address: eAddress.trim(),
        // 카테고리는 모달에서 변경 안 하므로 서버의 기존 값을 사용
        category: detail.category,
      };
      form.append(
        "request",
        new Blob([JSON.stringify(request)], { type: "application/json" })
      );
      if (eFile) form.append("images", eFile);

      const res = await fetch(
        `${API_BASE}/api/v1/informations/${detail.informationId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`수정 실패 (${res.status}) ${t}`);
      }

      // 성공 → 최신 상세 재요청
      const fresh = await getInformation(detail.informationId);
      setDetail(fresh);
      setEditMode(false);
      setEFile(null);

      // 목록에 반영
      setInfoList((prev) =>
        prev.map((x) =>
          x.serverId === fresh.informationId
            ? {
                ...x,
                title: fresh.title,
                detail: fresh.description,
                address: fresh.address,
                photoUrl: fresh.images?.[0]?.imageUrl ?? x.photoUrl,
                date: fresh.createdAt ?? x.date,
              }
            : x
        )
      );

      // 썸네일 캐시도 갱신
      if (fresh.images && fresh.images.length > 0) {
        setThumbMap((m) => ({
          ...m,
          [fresh.informationId]: fresh.images[0].imageUrl,
        }));
      }
    } catch (err: any) {
      setLoadErr(err?.message || "수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [detail, eTitle, eDesc, eAddress, eFile]);

  /* ===== 삭제 ===== */
  const handleDelete = useCallback(async () => {
    if (!detail) return;
    if (!confirm("정말 삭제하시겠어요? 삭제 후 되돌릴 수 없습니다.")) return;

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    setLoadErr(null);

    try {
      const res = await fetch(
        `${API_BASE}/api/v1/informations/${detail.informationId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok && res.status !== 204) {
        const t = await res.text().catch(() => "");
        throw new Error(`삭제 실패 (${res.status}) ${t}`);
      }

      // 목록에서 제거
      setInfoList((prev) =>
        prev.filter((x) => x.serverId !== detail.informationId)
      );
      closeModal();
    } catch (err: any) {
      setLoadErr(err?.message || "삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [detail, closeModal]);

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

        <ListViewport role="region" aria-label="정보 목록">
          {viewList.length === 0 && <EmptyBox>표시할 항목이 없습니다.</EmptyBox>}

          {viewList.map((item) => {
            const effectiveThumb =
              item.photoUrl ??
              (item.serverId ? thumbMap[item.serverId] ?? null : null);

            return (
              <Card
                key={item.rowId}
                onClick={() => openDetail(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openDetail(item)}
                title="상세 보기"
              >
                <RowBox>
                  <IconBox>
                    {effectiveThumb ? (
                      <ThumbDiv
                        role="img"
                        aria-label="썸네일"
                        $src={effectiveThumb}
                        $fit="cover"
                      />
                    ) : (
                      <ThumbFallback>이미지 없음</ThumbFallback>
                    )}
                  </IconBox>

                  <TextColumn>
                    <TextBox>{item.detail}</TextBox>
                    <TitleField>{item.title}</TitleField>
                  </TextColumn>

                  <RightColumn>
                    <IconButtonPlain aria-label="상세 보기">
                      <PlusIcon />
                    </IconButtonPlain>
                    <TagBox style={{ backgroundColor: item.color }}>
                      {item.categoryLabel}
                    </TagBox>
                  </RightColumn>
                </RowBox>
              </Card>
            );
          })}
        </ListViewport>

        <AddInfoRow>
          <AddInfoButton onClick={() => navigate("/localinfoform")}>
            정보 등록
          </AddInfoButton>
        </AddInfoRow>

        <BottomBar />
      </Container>

      {isOpen && (
        <ModalBackdrop role="presentation" onClick={closeModal}>
          <ModalShell role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <ModalHeaderRow>
              <AvatarCircle>{detail?.writer?.nickname?.[0] ?? "유"}</AvatarCircle>
              <NameCol>
                <Nickname>{detail?.writer?.nickname ?? "작성자"}</Nickname>
                <Handle>@{detail?.writer?.memberId ?? "-"}</Handle>
              </NameCol>
              <ModalCloseBtn onClick={closeModal} aria-label="닫기">
                ✕
              </ModalCloseBtn>
            </ModalHeaderRow>

            <TitleBar>
              <TitleLabel>제목 :</TitleLabel>

              {/* 제목: 보기/수정 토글 */}
              {!editMode ? (
                <TitleText>{detail?.title ?? (loading ? "불러오는 중…" : "—")}</TitleText>
              ) : (
                <input
                  value={eTitle}
                  onChange={(e) => setETitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  style={{
                    flex: 1,
                    border: "1px solid #ddd",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                />
              )}
            </TitleBar>

            <ContentCard>
              {!editMode ? (
                <ContentText>
                  {loadErr
                    ? loadErr
                    : loading
                    ? "상세 정보를 불러오는 중입니다…"
                    : detail?.description || "내용 없음"}
                </ContentText>
              ) : (
                <textarea
                  value={eDesc}
                  onChange={(e) => setEDesc(e.target.value)}
                  placeholder="내용을 입력하세요"
                  rows={5}
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    resize: "vertical",
                  }}
                />
              )}
              <ContentDate>{detail?.createdAt ? fmtDate(detail.createdAt) : ""}</ContentDate>
            </ContentCard>

            {/* 이미지(첫 장) */}
            {(detail?.images?.length || editMode) && (
              <div style={{ margin: "8px 4px 0", borderRadius: 12, overflow: "hidden" }}>
                {(!editMode && detail?.images?.[0]?.imageUrl) && (
                  <ThumbDiv
                    $src={detail.images[0].imageUrl}
                    $fit="cover"
                    style={{ width: "100%", height: 180 }}
                  />
                )}

                {editMode && (
                  <div style={{ display: "grid", gap: 8 }}>
                    {detail?.images?.[0]?.imageUrl && (
                      <ThumbDiv
                        $src={detail.images[0].imageUrl}
                        $fit="cover"
                        style={{ width: "100%", height: 180 }}
                      />
                    )}
                    <label
                      style={{
                        display: "inline-block",
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px dashed #bbb",
                        borderRadius: 12,
                        cursor: "pointer",
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      {eFile ? `이미지 선택됨: ${eFile.name}` : "이미지 바꾸기"}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(ev) => setEFile(ev.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* 주소 */}
            <AddressRow>
              <AddressDot aria-hidden>📍</AddressDot>
              {!editMode ? (
                <AddressLink onClick={goAddress}>
                  {detail?.address || "주소 정보가 없습니다."}
                </AddressLink>
              ) : (
                <input
                  value={eAddress}
                  onChange={(e) => setEAddress(e.target.value)}
                  placeholder="주소를 입력하세요"
                  style={{
                    flex: 1,
                    border: "1px solid #ddd",
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              )}
            </AddressRow>

            {/* 카테고리 뱃지 (읽기 전용) */}
            <CategoryBadgeLarge
              style={{
                backgroundColor: CATEGORY_COLOR[(detail?.category as ServerCategory) ?? "ETC"],
              }}
            >
              {detail ? CATEGORY_LABEL[(detail.category as ServerCategory) ?? "ETC"] : ""}
            </CategoryBadgeLarge>

            {/* 모달 하단 버튼들 */}
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                padding: "12px 4px 6px",
              }}
            >
              {!editMode ? (
                <>
                  {/* 수정하기 / 삭제하기 */}
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #f5c2c7",
                      background: "#f8d7da",
                      color: "#842029",
                      cursor: "pointer",
                    }}
                  >
                    삭제하기
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setEFile(null);
                      if (detail) {
                        setETitle(detail.title);
                        setEDesc(detail.description);
                        setEAddress(detail.address ?? "");
                      }
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #4CAF50",
                      background: "#4CAF50",
                      color: "white",
                      cursor: "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? "저장 중…" : "저장"}
                  </button>
                </>
              )}
            </div>
          </ModalShell>
        </ModalBackdrop>
      )}
    </Wrapper>
  );
};

export default LocalInfoShare;
