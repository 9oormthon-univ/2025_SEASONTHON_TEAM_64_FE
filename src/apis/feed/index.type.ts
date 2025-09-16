interface FeedResponse {
  feedId: number;
  nickname: string;
  profileImageUrl?: string;
  description: string;
  imageUrl: string;
  isMine: boolean;
  isLiked: boolean;
  createdAt: string;
}

interface FeedCreateRequest {
  missionId: number;
  description: string;
}

interface FeedModifyRequest {
  description: string;
}

export { FeedResponse, FeedCreateRequest, FeedModifyRequest };
