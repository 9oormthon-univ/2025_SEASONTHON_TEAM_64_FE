// src/LocalInfoShare/api/Information.ts
import { api } from "./Client";

export type InformationCategory =
  | "HOSPITAL_FACILITIES"
  | "RESTAURANT_CAFE"
  | "ETC";

export interface UpsertInformationReq {
  title: string;
  description: string;
  category: InformationCategory;
  address: string;
  latitude?: number;
  longitude?: number;

  // ★ 백엔드 스펙에 맞게 이미지 URL 배열(필드명 다르면 바꿔주세요)
  imageUrls?: string[];
}

export interface InformationImage {
  imageId: number;
  imageUrl: string;
}
export interface InformationWriter {
  memberId: number;
  nickname: string;
  profileImageUrl?: string;
  role?: string;
}
export interface InformationDetail {
  informationId: number;
  title: string;
  description: string;
  category: InformationCategory;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  writer?: InformationWriter;
  images?: InformationImage[];
}
export interface InformationListItem {
  informationId: number;
  title: string;
  description: string;
  category: InformationCategory;
  address: string;
  createdAt: string;
  writer?: InformationWriter;
  images?: InformationImage[];
}

// ★ JSON 방식 생성
export async function createInformationJson(req: UpsertInformationReq) {
  const { data } = await api.post<number>("/api/v1/informations", req, {
    headers: { "Content-Type": "application/json" },
  });
  return data; // 생성된 정보 ID
}

// 필요 시 수정(이미지 교체도 이미지 업로드→URL로 넣기)
export async function updateInformationJson(
  informationId: number,
  req: UpsertInformationReq
) {
  const { data } = await api.put<number>(`/api/v1/informations/${informationId}`, req, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function listInformations() {
  const { data } = await api.get<InformationListItem[]>("/api/v1/informations");
  return data;
}
export async function getInformation(id: number) {
  const { data } = await api.get<InformationDetail>(`/api/v1/informations/${id}`);
  return data;
}
