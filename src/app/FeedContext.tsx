import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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
    return Math.max(...posts.map(p => p.id), 0) + 1;
  }, [posts]);

  const addPost = useCallback((postData: Omit<Post, 'id' | 'likes' | 'comments' | 'isLiked' | 'createdAt'>) => {
    const newPost: Post = {
      ...postData,
      id: getNextId(),
      likes: 0,
      comments: 0,
      isLiked: false,
      createdAt: Date.now(),
      isOffline: !isOnline
    };
    setPosts(prev => [newPost, ...prev]);
    if (!isOnline) {
      setPendingActions(prev => [...prev, { type: 'ADD_POST', data: newPost, timestamp: Date.now() }]);
    }
  }, [getNextId, isOnline]);

  const updatePost = useCallback((id: number, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, ...updates } : post));
    if (!isOnline) {
      setPendingActions(prev => [...prev, { type: 'UPDATE_POST', data: { id, updates }, timestamp: Date.now() }]);
    }
  }, [isOnline]);

  const deletePost = useCallback((id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    if (!isOnline) {
      setPendingActions(prev => [...prev, { type: 'DELETE_POST', data: { id }, timestamp: Date.now() }]);
    }
  }, [isOnline]);

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
