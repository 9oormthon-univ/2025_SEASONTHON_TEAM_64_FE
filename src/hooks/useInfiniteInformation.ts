import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getInformationList } from '../apis/information';
import type { InformationResponse } from '../apis/information/index.type';

const useInfiniteInformation = (category: string | null) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['informationList', category ?? 'ALL'],
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      const res = await getInformationList(
        pageParam ?? undefined,
        category ?? undefined,
        true,
      ).execute();
      return res.data as InformationResponse[];
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].informationId ?? undefined;
    },
  });

  const items = useMemo<InformationResponse[]>(
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
    const rootEl = containerRef.current ?? null;
    const io = new IntersectionObserver(onIntersect, {
      root: rootEl,
      threshold: 0.1,
      rootMargin: '0px 0px 200px 0px',
    });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [onIntersect, items.length]);

  useEffect(() => {
    const rootEl: HTMLElement | Window = containerRef.current ?? window;
    const handler = () => {
      if (!sentinelRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      const viewportHeight =
        rootEl === window
          ? window.innerHeight
          : (rootEl as HTMLElement).getBoundingClientRect().height;
      const inRange = rect.top < viewportHeight + 220;
      if (inRange && hasNextPage && !isFetchingNextPage && !isLoading) {
        fetchNextPage();
      }
    };

    if (rootEl === window) {
      window.addEventListener('scroll', handler, { passive: true });
      window.addEventListener('resize', handler);
    } else {
      (rootEl as HTMLElement).addEventListener('scroll', handler, {
        passive: true,
      });
      window.addEventListener('resize', handler);
    }
    handler();
    return () => {
      if (rootEl === window) {
        window.removeEventListener('scroll', handler);
        window.removeEventListener('resize', handler);
      } else {
        (rootEl as HTMLElement).removeEventListener('scroll', handler);
        window.removeEventListener('resize', handler);
      }
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage, items.length]);

  return {
    items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    sentinelRef,
    containerRef,
    refetch,
  };
};

export default useInfiniteInformation;
