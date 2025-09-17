import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../apis/comment';
import type { CommentResponse } from '../apis/comment/index.type';
import type { InfiniteCommentData } from './useComments';

type CreateContext = { optimisticId: number };

export function useCreateComment(feedId: number) {
  const queryClient = useQueryClient();

  return useMutation<number, unknown, string, CreateContext>({
    mutationFn: async (description: string) => {
      const builder = createComment(feedId, { description });
      const res = await builder.execute();
      return res.data as number;
    },
    onMutate: async (description) => {
      await queryClient.cancelQueries({ queryKey: ['comments', feedId] });
      const optimistic: CommentResponse = {
        commentId: Date.now(),
        feedId,
        nickname: '나',
        imageUrl: '',
        description,
        isMine: true,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<InfiniteCommentData>(
        ['comments', feedId],
        (prev) => {
          if (!prev) {
            return {
              pages: [[optimistic]],
              pageParams: [undefined],
            } as InfiniteCommentData;
          }
          return {
            ...prev,
            pages: prev.pages.map((p: CommentResponse[], idx: number) =>
              idx === 0 ? [optimistic, ...p] : p,
            ),
          };
        },
      );
      return { optimisticId: optimistic.commentId } as const;
    },
    onError: (_err, _vars, context) => {
      // rollback - easiest is to invalidate or remove optimistic by id
      if (context) {
        queryClient.setQueryData<InfiniteCommentData>(
          ['comments', feedId],
          (prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              pages: prev.pages.map((p: CommentResponse[]) =>
                p.filter((c) => c.commentId !== context.optimisticId),
              ),
            };
          },
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
    },
  });
}
