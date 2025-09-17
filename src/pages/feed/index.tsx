import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getUserMission } from '../../apis/mission';
import { checkNotification } from '../../apis/notification';

import logo from '../../assets/feed/logo.svg';
import front from '../../assets/feed/front-maru.svg';
import notify from '../../assets/feed/notification.svg';
import nonNotify from '../../assets/feed/non-notification.svg';
import create from '../../assets/feed/plus.svg';
import { getFeedList, likeFeed, unlikeFeed, deleteFeed } from '../../apis/feed';
import type { FeedResponse } from '../../apis/feed/index.type';
import { useToastContext } from '../../components/toast/Toast';
import { useInfiniteQuery } from '@tanstack/react-query';
import CommentBottomSheet from '../../components/feed/CommentBottomSheet';
import MissionBox from '../../components/feed/MissionBox';
import FeedCard from '../../components/feed/FeedCard';

const FeedPage = () => {
  const navigate = useNavigate();
  const { show } = useToastContext();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<FeedResponse[]>({
      queryKey: ['feedList'],
      queryFn: async ({ pageParam }) => {
        const builder = getFeedList(pageParam as number | undefined);
        const res = await builder.execute();
        return res.data as FeedResponse[];
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        return Math.min(...lastPage.map((f) => f.feedId));
      },
      staleTime: 5 * 1000,
    });

  const feeds: FeedResponse[] = React.useMemo(() => {
    if (!data) return [];
    return (data.pages as FeedResponse[][]).flat();
  }, [data]);

  const [optimisticFeeds, setOptimisticFeeds] =
    React.useState<FeedResponse[]>(feeds);
  useEffect(() => {
    setOptimisticFeeds(feeds);
  }, [feeds]);

  const setFeeds = useCallback(
    (updater: (prev: FeedResponse[]) => FeedResponse[]) => {
      setOptimisticFeeds((prev) => updater(prev));
    },
    [],
  );
  const { data: todayMission } = useApiQuery(getUserMission(), ['userMission']);
  const { data: notification } = useApiQuery(checkNotification(), [
    'notification',
  ]);

  const [activeFeedId, setActiveFeedId] = React.useState<number | null>(null);
  const activeFeed = React.useMemo(
    () => optimisticFeeds.find((f) => f.feedId === activeFeedId) || null,
    [activeFeedId, optimisticFeeds],
  );

  const openComments = (feedId: number) => {
    setActiveFeedId(feedId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeComments = () => setActiveFeedId(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const intersectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!intersectionRef.current) return;
    const target = intersectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );
    observer.observe(target);
    observerRef.current = observer as unknown as HTMLDivElement;
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleToggleLike = (feedId: number, current: boolean) => {
    setFeeds((prev) =>
      prev?.map((f) =>
        f.feedId === feedId
          ? {
              ...f,
              isLiked: !current,
            }
          : f,
      ),
    );

    const action = current ? unlikeFeed : likeFeed;
    action(feedId)
      .execute()
      .then(() => {
        show(
          current ? '피드에 좋아요를 취소했어요!' : '피드에 좋아요를 눌렀어요!',
          'info',
          true,
        );
      })
      .catch(() => {
        setFeeds((prev) =>
          prev?.map((f) =>
            f.feedId === feedId
              ? {
                  ...f,
                  isLiked: current,
                }
              : f,
          ),
        );
        show(
          current
            ? '피드에 좋아요 취소를 실패했어요.'
            : '피드에 좋아요를 누르는 데 실패했어요.',
          'error',
          true,
        );
      });
  };

  const handleDeleteFeed = (feedId: number) => {
    const prev = optimisticFeeds;
    setOptimisticFeeds((p) => p.filter((f) => f.feedId !== feedId));
    if (activeFeedId === feedId) {
      closeComments();
    }
    deleteFeed(feedId)
      .execute()
      .then(() => {
        show('피드를 삭제했어요!', 'info', true);
      })
      .catch(() => {
        setOptimisticFeeds(prev);
        show('피드 삭제에 실패했어요.', 'error', true);
      });
  };

  return (
    <>
      <S.Container>
        <S.CreateIcon src={create} onClick={() => navigate('/create')} />
        <S.ImageWrapper>
          <S.Logo src={logo} />
          <S.Front src={front} />
          <S.Notify
            src={notification ? notify : nonNotify}
            onClick={() => navigate('/notification')}
          />
        </S.ImageWrapper>
        {activeFeed && activeFeedId ? (
          <div
            style={{
              marginTop: '3.5rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FeedCard
              feed={activeFeed}
              onToggleLike={handleToggleLike}
              onOpenComments={openComments}
              onDelete={handleDeleteFeed}
            />
          </div>
        ) : (
          <MissionBox description={todayMission?.description} />
        )}
        <S.FeedList>
          {optimisticFeeds
            ?.filter((f) => f.feedId !== activeFeedId)
            .map((feed) => (
              <FeedCard
                key={feed.feedId}
                feed={feed}
                onToggleLike={handleToggleLike}
                onOpenComments={openComments}
                onDelete={handleDeleteFeed}
              />
            ))}
          <S.Sentinel ref={intersectionRef} />
          {isFetchingNextPage && <S.Loading>불러오는 중...</S.Loading>}
          {!hasNextPage && status === 'success' && (
            <S.EndMessage>더 이상 피드가 없습니다.</S.EndMessage>
          )}
        </S.FeedList>
      </S.Container>
      {activeFeedId !== null && (
        <CommentBottomSheet
          feedId={activeFeedId}
          onClose={() => {
            closeComments();
          }}
        />
      )}
    </>
  );
};

export default FeedPage;
