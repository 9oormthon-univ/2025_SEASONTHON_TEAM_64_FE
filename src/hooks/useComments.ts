import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommentList } from '../apis/comment';
import type { CommentResponse } from '../apis/comment/index.type';

type InfiniteCommentData =
  | { pages: CommentResponse[][]; pageParams: unknown[] }
  | undefined;

export function useComments(feedId: number) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<CommentResponse[]>({
      queryKey: ['comments', feedId],
      queryFn: async ({ pageParam }) => {
        const builder = getCommentList(feedId, pageParam as number | undefined);
        const res = await builder.execute();
        return res.data as CommentResponse[];
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        return Math.min(...lastPage.map((c) => c.commentId));
      },
      staleTime: 5 * 1000,
    });

  const comments: CommentResponse[] = useMemo(() => {
    if (!data) return [];
    return data.pages.flat();
  }, [data]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const target = sentinelRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    comments,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sentinelRef,
  } as const;
}

export type { InfiniteCommentData };
