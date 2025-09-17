import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyNotifications } from '../apis/notification';
import type { NotificationResponse } from '../apis/notification/index.type';

const useInfiniteNotifications = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      initialPageParam: null as number | null,
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
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.1,
    });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [onIntersect]);

  return { items, isLoading, isFetchingNextPage, sentinelRef };
};

export default useInfiniteNotifications;
