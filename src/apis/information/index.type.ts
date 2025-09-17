interface InformationCreateRequest {
  title: string;
  description: string;
  address: string;
  category: string;
}

interface InformationModifyRequest {
  title: string;
  description: string;
  address: string;
  category: string;
}

interface InformationResponse {
  informationId: number;
  title: string;
  description: string;
  category: string;
  address: string;
  imageUrl?: string;
}

interface InformationDetailResponse {
  informationId: number;
  title: string;
  description: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  writer: MemberDetailResponse;
  images?: ImageResponse[];
}

/* ************************************************** */
interface MemberDetailResponse {
  memberId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  role: string;
  mode: string;
}

interface ImageResponse {
  imageId: number;
  imageUrl: string;
}
/* ************************************************** */

export type {
  InformationCreateRequest,
  InformationModifyRequest,
  InformationDetailResponse,
  InformationResponse,
};
