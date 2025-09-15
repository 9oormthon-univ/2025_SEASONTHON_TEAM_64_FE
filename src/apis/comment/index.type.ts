interface CommentCreateRequest {
  description: string;
}

interface CommentResponse {
  commentId: number;
  feedId: number;
  nickname: string;
  imageUrl: string;
  description: string;
  isMine: boolean;
  createdAt: string;
}

export { CommentCreateRequest, CommentResponse };
