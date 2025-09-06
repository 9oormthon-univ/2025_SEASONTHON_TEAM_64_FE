import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { feedService } from '../TodayViewFeed/feedService';
import { imageService } from '../services/imageService';
import { authService } from '../services/authService';

export interface Post {
  id: number;
  user: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: number;
  isOffline?: boolean;
  missionId?: number;
}

interface FeedContextValue {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked' | 'createdAt'>) => void;
  updatePost: (id: number, updates: Partial<Post>) => void;
  deletePost: (id: number) => void;
  likePost: (id: number) => void;
  addComment: (postId: number) => void;
  syncWithServer: () => Promise<void>;
  isOnline: boolean;
  pendingActions: Array<{ type: string; data: any; timestamp: number }>;
}

const FeedContext = createContext<FeedContextValue | undefined>(undefined);

const STORAGE_KEY = "feed_data_v1";
const PENDING_ACTIONS_KEY = "pending_actions_v1";

// 쿠키 유틸
function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name: string, value: string, days: number = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function getDefaultPosts(): Post[] {
  return [
    {
      id: 1,
      user: '사용자1',
      content: '오늘 하늘 정말 예뻤어요!',
      image: '/placeholder-image.jpg',
      likes: 12,
      comments: 3,
      isLiked: false,
      createdAt: Date.now() - 86400000,
      isOffline: false
    },
    {
      id: 2,
      user: '사용자2',
      content: '산책길에서 만난 고양이입니다',
      image: '/placeholder-image.jpg',
      likes: 8,
      comments: 1,
      isLiked: true,
      createdAt: Date.now() - 172800000,
      isOffline: false
    },
    {
      id: 3,
      user: '사용자3',
      content: '오늘 점심 메뉴 추천해주세요!',
      image: '/placeholder-image.jpg',
      likes: 5,
      comments: 8,
      isLiked: false,
      createdAt: Date.now() - 259200000,
      isOffline: false
    },
    {
      id: 4,
      user: '사용자4',
      content: '주말에 갈만한 곳 있나요?',
      image: '/placeholder-image.jpg',
      likes: 20,
      comments: 15,
      isLiked: false,
      createdAt: Date.now() - 345600000,
      isOffline: false
    }
  ];
}

function loadFromStorage(): Post[] {
  try {
    // 쿠키 우선
    const cookieRaw = getCookie(STORAGE_KEY);
    if (cookieRaw) {
      const parsed = JSON.parse(cookieRaw);
      if (Array.isArray(parsed)) return parsed as Post[];
    }
    // 로컬 스토리지 백업
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPosts();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return getDefaultPosts();
    return parsed as Post[];
  } catch {
    return getDefaultPosts();
  }
}

function saveToStorage(posts: Post[]) {
  try {
    const json = JSON.stringify(posts);
    // 쿠키 용량 보호: 대략 4KB 근처 제한 고려
    if (json.length < 3500) {
      setCookie(STORAGE_KEY, json);
    }
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
  }
}

function loadPendingActions(): Array<{ type: string; data: any; timestamp: number }> {
  try {
    const cookieRaw = getCookie(PENDING_ACTIONS_KEY);
    if (cookieRaw) {
      const parsed = JSON.parse(cookieRaw);
      if (Array.isArray(parsed)) return parsed;
    }
    const raw = localStorage.getItem(PENDING_ACTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function savePendingActions(actions: Array<{ type: string; data: any; timestamp: number }>) {
  try {
    const json = JSON.stringify(actions);
    if (json.length < 3500) {
      setCookie(PENDING_ACTIONS_KEY, json);
    }
    localStorage.setItem(PENDING_ACTIONS_KEY, json);
  } catch {
  }
}

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => loadFromStorage());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<Array<{ type: string; data: any; timestamp: number }>>(() => loadPendingActions());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    saveToStorage(posts);
  }, [posts]);

  useEffect(() => {
    savePendingActions(pendingActions);
  }, [pendingActions]);

  const getNextId = useCallback(() => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return timestamp + randomSuffix;
  }, []);

  const addPost = useCallback(async (postData: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked' | 'createdAt'>) => {
    // 인증 상태 확인
    if (!authService.isAuthenticated()) {
      console.log('❌ 인증되지 않은 사용자');
      throw new Error('로그인이 필요합니다.');
    }

    try {
      // 회원 정보 확인
      const memberInfo = await authService.getMemberInfo();
      if (!memberInfo) {
        console.log('❌ 회원 정보 조회 실패');
        throw new Error('로그인 상태를 확인할 수 없습니다.');
      }

      // missionId가 없으면 미션 목록에서 첫 번째 미션 사용
      let finalMissionId = postData.missionId;
      if (!finalMissionId) {
        try {
          const missions = await missionService.listMissions();
          if (missions && missions.length > 0) {
            finalMissionId = parseInt(missions[0].id);
            console.log('📝 기본 미션 ID 사용:', finalMissionId);
          } else {
            finalMissionId = 1; // 최후의 수단
          }
        } catch (missionError) {
          console.log('⚠️ 미션 목록 조회 실패, 기본값 사용:', missionError);
          finalMissionId = 1;
        }
      }

      console.log('📝 최종 미션 ID:', finalMissionId);

      // API 호출
      const response = await feedService.createFeed({
        description: postData.content,
        imageUrl: postData.image,
        missionId: finalMissionId
      });

      // API 응답을 Post 형태로 변환
      const newPost: Post = {
        id: response.feedId,
        user: response.member.nickname,
        content: response.description,
        image: response.imageUrl,
        likes: response.likeCount,
        comments: response.commentCount,
        isLiked: false,
        createdAt: Date.now(),
        isOffline: false,
        missionId: response.missionId
      };

      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('게시글 추가 실패:', error);
      // 오프라인 상태라면 대기 액션에 추가
      if (!isOnline) {
        const newPost: Post = {
          ...postData,
          id: getNextId(),
          likes: 0,
          comments: 0,
          isLiked: false,
          createdAt: Date.now(),
          isOffline: true
        };
        setPosts(prev => [newPost, ...prev]);
        setPendingActions(prev => [...prev, { type: 'ADD_POST', data: newPost, timestamp: Date.now() }]);
      }
      throw error; // 에러를 다시 던져서 상위에서 처리할 수 있도록
    }
  }, [getNextId, isOnline]);

  const updatePost = useCallback(async (id: number, updates: Partial<Post>) => {
    try {
      // API 호출
      const response = await feedService.updateFeed(id, {
        description: updates.content || '',
        imageUrl: updates.image || '',
        missionId: updates.missionId || 1
      });

      // API 응답을 Post 형태로 변환하여 업데이트
      const updatedPost: Post = {
        id: response.feedId,
        user: response.member.nickname,
        content: response.description,
        image: response.imageUrl,
        likes: response.likeCount,
        comments: response.commentCount,
        isLiked: false,
        createdAt: Date.now(),
        isOffline: false,
        missionId: response.missionId
      };

      setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      // 오프라인 상태라면 로컬에서만 업데이트
      if (!isOnline) {
        setPosts(prev => prev.map(post => post.id === id ? { ...post, ...updates } : post));
        setPendingActions(prev => [...prev, { type: 'UPDATE_POST', data: { id, updates }, timestamp: Date.now() }]);
      }
    }
  }, [isOnline]);

  const deletePost = useCallback(async (id: number) => {
    try {
      // 삭제할 게시글 찾기
      const postToDelete = posts.find(post => post.id === id);
      
      // API 호출
      await feedService.deleteFeed(id);
      
      // 이미지가 있으면 이미지도 삭제
      if (postToDelete && postToDelete.image && postToDelete.image !== '/placeholder-image.jpg') {
        try {
          await imageService.deleteImage(postToDelete.image);
          console.log('✅ 이미지 삭제 완료');
        } catch (imageError) {
          console.error('이미지 삭제 실패:', imageError);
          // 이미지 삭제 실패해도 게시글 삭제는 계속 진행
        }
      }
      
      // 성공 시 로컬에서도 제거
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      // 오프라인 상태라면 로컬에서만 삭제
      if (!isOnline) {
        setPosts(prev => prev.filter(post => post.id !== id));
        setPendingActions(prev => [...prev, { type: 'DELETE_POST', data: { id }, timestamp: Date.now() }]);
      }
    }
  }, [isOnline, posts]);

  const likePost = useCallback((id: number) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } : post));
    if (!isOnline) {
      setPendingActions(prev => [...prev, { type: 'LIKE_POST', data: { id }, timestamp: Date.now() }]);
    }
  }, [isOnline]);

  const addComment = useCallback((postId: number) => {
    setPosts(prev => prev.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
    if (!isOnline) {
      setPendingActions(prev => [...prev, { type: 'ADD_COMMENT', data: { postId }, timestamp: Date.now() }]);
    }
  }, [isOnline]);

  const syncWithServer = useCallback(async () => {
    if (!isOnline || pendingActions.length === 0) return;
    try {
      console.log('서버와 동기화 중...', pendingActions);
      setPendingActions([]);
    } catch (error) {
      console.error('동기화 실패:', error);
    }
  }, [isOnline, pendingActions]);

  // 초기 데이터 로딩
  useEffect(() => {
    const loadInitialFeeds = async () => {
      try {
        console.log('🔄 초기 피드 데이터 로딩 시작');
        const response = await feedService.getFeedsCursor(undefined, 10);
        
        // API 응답이 유효한지 확인
        if (response && response.items && Array.isArray(response.items)) {
          console.log('📊 API 응답 분석:', {
            itemsCount: response.items.length,
            firstItem: response.items[0],
            hasNext: response.hasNext,
            nextCursorId: response.nextCursorId
          });
          
          // API 응답을 Post 형태로 변환
          const apiPosts: Post[] = response.items.map(feed => {
            console.log('🔄 피드 변환:', {
              feedId: feed.feedId,
              member: feed.member,
              description: feed.description,
              imageUrl: feed.imageUrl
            });
            
            return {
              id: feed.feedId,
              user: feed.member?.nickname || '알 수 없음',
              content: feed.description || '',
              image: feed.imageUrl || '/placeholder-image.jpg',
              likes: feed.likeCount || 0,
              comments: feed.commentCount || 0,
              isLiked: false,
              createdAt: Date.now(),
              isOffline: false,
              missionId: feed.missionId || 1
            };
          });

          setPosts(apiPosts);
          console.log('✅ 초기 피드 데이터 로딩 완료:', apiPosts.length, '개');
        } else {
          console.log('⚠️ API 응답이 유효하지 않음, 더미 데이터 사용');
          console.log('📊 응답 구조:', response);
          
          // 더미 데이터 추가
          const dummyPosts: Post[] = [
            {
              id: Date.now(),
              user: '마루',
              content: '날씨가 좋아요',
              image: '/placeholder-image.jpg',
              likes: 5,
              comments: 2,
              isLiked: false,
              createdAt: Date.now(),
              isOffline: false,
              missionId: 1
            }
          ];
          setPosts(dummyPosts);
          console.log('✅ 더미 데이터 설정 완료');
        }
      } catch (error) {
        console.error('❌ 초기 피드 데이터 로딩 실패:', error);
        console.log('📝 로컬 데이터 사용');
      }
    };

    loadInitialFeeds();
  }, []);

  useEffect(() => {
    if (isOnline && pendingActions.length > 0) {
      syncWithServer();
    }
  }, [isOnline, pendingActions.length, syncWithServer]);

  const value = useMemo<FeedContextValue>(() => ({
    posts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    syncWithServer,
    isOnline,
    pendingActions
  }), [posts, addPost, updatePost, deletePost, likePost, addComment, syncWithServer, isOnline, pendingActions]);

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeed must be used within FeedProvider");
  return ctx;
}
