export interface TodayMission {
  memberId: number;
  date: string;
  mission: {
    id: number;
    title: string;
  };
  status: 'ASSIGNED' | 'COMPLETED';
}

export interface UploadImageResponse {
  imageUrl: string;
}

export interface CursorPageResponse {
  items: Item[];
  nextCursorId: number;
  hasNext: boolean;
}

export interface Item {
  feedId: number;
  description: string;
  imageUrl?: string;
  member?: {
    memberId: number;
    nickname: string;
    profileImageUrl?: string;
    role: string;
  };
  likeCount: number;
  commentCount: number;
  missionId: number;
}
