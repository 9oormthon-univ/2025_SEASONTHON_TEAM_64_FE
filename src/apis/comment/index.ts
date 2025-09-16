import ApiBuilder from '../config/builder/ApiBuilder';
import type { CommentCreateRequest, CommentResponse } from './index.type';

const createComment = (feedId: number, request: CommentCreateRequest) => {
  return ApiBuilder.create<CommentCreateRequest, number>(
    `/api/v1/feeds/${feedId}/comments`,
  )
    .setMethod('POST')
    .setData(request);
};

const deleteComment = (feedId: number, commentId: number) => {
  return ApiBuilder.create<void, void>(
    `/api/v1/feeds/${feedId}/comments/${commentId}`,
  ).setMethod('DELETE');
};

const getCommentList = (feedId: number, lastCommentId?: number) => {
  return ApiBuilder.create<void, CommentResponse[]>(
    `/api/v1/feeds/${feedId}/comments`,
  )
    .setMethod('GET')
    .setParams({ lastCommentId });
};

export { createComment, deleteComment, getCommentList };
