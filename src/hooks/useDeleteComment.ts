import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../apis/comment';
import type { CommentResponse } from '../apis/comment/index.type';
import type { InfiniteCommentData } from './useComments';

export function useDeleteComment(
  feedId: number,
  onError?: () => void,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, { commentId: number }>({
    mutationFn: async ({ commentId }) => {
      const builder = deleteComment(feedId, commentId);
      await builder.execute();
    },
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', feedId] });
      queryClient.setQueryData<InfiniteCommentData>(
        ['comments', feedId],
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((p) =>
              p.filter((c: CommentResponse) => c.commentId !== commentId),
            ),
          };
        },
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
      onError?.();
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
    },
  });

  return mutation;
}
