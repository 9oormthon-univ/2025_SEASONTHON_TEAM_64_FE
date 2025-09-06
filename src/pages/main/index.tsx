import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './index.styles';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';
import { useNavigate } from 'react-router-dom';

import logo from './assets/logo.svg';
import front from './assets/front-maru.svg';
import notify from './assets/notify.svg';
import genenrateIcon from './assets/generate.svg';
import noImage from './assets/non-image.svg';
import heartOn from './assets/HeartOn.svg';
import heartOff from './assets/HeartOff.svg';
import Comment from './assets/Comment.svg';
import { getMissionByCursor, getTodayMission } from '../../apis/mission';
import { useInfiniteQuery } from '@tanstack/react-query';

const Main = () => {
  const navigate = useNavigate();
  // 각 게시물별 하트 토글(가짜) 상태
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const { data: todayMissionData } = useApiQuery(getTodayMission(), [
    'todayMission',
  ]);
  const {
    data: memberData,
    isLoading,
    isError,
  } = useApiQuery(getMemberDetail(), ['member']);

  // 무한 스크롤: 미션 피드
  const {
    data: missionPages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    status: missionStatus,
  } = useInfiniteQuery({
    queryKey: ['missions'],
    queryFn: async ({ pageParam }) => {
      const builder = getMissionByCursor({ cursorId: pageParam, size: 5 });
      const res = await builder.execute();
      return res.data;
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursorId : undefined,
  });

  const allItems = useMemo(() => {
    // 서버 응답 구조가 items 또는 content 등일 수 있음에 대비
    const pages = missionPages?.pages ?? [];
    const extracted = pages.flatMap((p: any) => p?.items ?? p?.content ?? []);
    return (extracted ?? []).filter(Boolean);
  }, [missionPages]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        // 내부 스크롤 컨테이너를 루트로 지정해 실제 스크롤에 반응하도록 함
        root: listRef.current ?? null,
        rootMargin: '200px 0px',
        threshold: 0,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      navigate('/login', { replace: true });
      return;
    }

    if (!memberData) {
      navigate('/login', { replace: true });
      return;
    }

    if (memberData.role === 'ROLE_ADMIN') {
      navigate('/admin', { replace: true });
    }
  }, [isLoading, isError, memberData, navigate]);

  if (isLoading) return <></>;
  return (
    <>
      <S.Container>
        <S.ImageWrapper>
          <S.Logo src={logo} />
          <S.Front src={front} />
          <S.Notify src={notify} />
        </S.ImageWrapper>
        <S.TodayMissionBox>
          <S.MissionTitle>오늘의 시선 MISSION</S.MissionTitle>
          <S.MissionContent>
            {todayMissionData?.mission.title ? (
              <>{todayMissionData.mission.title}</>
            ) : (
              '오늘의 미션이 없습니다.'
            )}
          </S.MissionContent>
        </S.TodayMissionBox>
        <S.FeedList ref={listRef}>
          {allItems?.map((item, index) => {
            const member = item?.member;
            const key = String(item?.feedId ?? `idx-${index}`);
            const isLiked = likedMap[key] ?? false;
            return (
              <S.FeedCard key={item?.feedId ?? index}>
                <S.MemberLabel>
                  <S.MemberImage
                    src={member?.profileImageUrl || noImage}
                    alt={member?.nickname || 'no-image'}
                  />
                  <S.MemberTextSection>
                    <S.MemberText>
                      {member?.nickname || '알 수 없음'}
                    </S.MemberText>
                  </S.MemberTextSection>
                </S.MemberLabel>
                <S.FeedImage
                  src={item.imageUrl || noImage}
                  alt={item.description || 'no-image'}
                />
                <S.FeedIconSection>
                  <img
                    src={isLiked ? heartOn : heartOff}
                    alt={isLiked ? 'heart-on' : 'heart-off'}
                    onClick={() =>
                      setLikedMap((prev) => ({ ...prev, [key]: !isLiked }))
                    }
                    style={{ cursor: 'pointer' }}
                  />
                  <img src={Comment} alt="comment" />
                </S.FeedIconSection>
                <S.FeedDescription>{item.description}</S.FeedDescription>
              </S.FeedCard>
            );
          })}

          {(!allItems || allItems.length === 0) &&
            missionStatus === 'success' && (
              <S.FeedStatus>표시할 피드가 없습니다.</S.FeedStatus>
            )}
          <div ref={sentinelRef} />
          {missionStatus === 'pending' && (
            <S.FeedStatus>불러오는 중…</S.FeedStatus>
          )}
          {isFetchingNextPage && <S.FeedStatus>더 불러오는 중…</S.FeedStatus>}
          {!hasNextPage && missionPages && (
            <S.FeedStatus>마지막입니다.</S.FeedStatus>
          )}
        </S.FeedList>
        <S.GenenrateIcon
          src={genenrateIcon}
          onClick={() => navigate('/generate')}
        />
      </S.Container>
    </>
  );
};

export default Main;
