import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyNotifications } from '../apis/notification';
import type { NotificationResponse } from '../apis/notification/index.type';

const useInfiniteNotifications = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      initialPageParam: undefined as number | undefined,
      queryFn: async ({ pageParam }) => {
        const res = await getMyNotifications(pageParam ?? null).execute();
        return res.data as NotificationResponse[];
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        return lastPage[lastPage.length - 1].id ?? undefined;
      },
    });

  const items = useMemo<NotificationResponse[]>(
    () => (data?.pages ?? []).flat(),
    [data],
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        !isLoading
      ) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading],
  );

  useEffect(() => {
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(onIntersect, {
      root: containerRef.current,
      threshold: 0.1,
    });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [onIntersect, items.length, containerRef]);

  return {
    items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    sentinelRef,
    containerRef,
  };
};

export default useInfiniteNotifications;
