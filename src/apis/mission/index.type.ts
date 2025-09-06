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
