export interface TodayMission {
  memberId: number;
  date: string;
  mission: {
    missionId: number;
    title: string;
  };
  status: 'ASSIGNED' | 'COMPLETED';
}
