interface MissionCreateRequest {
  description: string;
}

interface MissionModifyRequest {
  missionId: number;
  description: string;
}

interface MissionResponse {
  id: number;
  description: string;
}

export { MissionCreateRequest, MissionModifyRequest, MissionResponse };
