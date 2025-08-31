import React, { useState } from 'react';
import styled from 'styled-components';
import { Bell, Home, Star, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MissionCard from './MissionCard';
import FeedPost from './FeedPost';
import BottomNavigation from './BottomNavigation';

interface Post {
  id: number;
  user: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const TodayViewFeed: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: '사용자1',
      content: '오늘 하늘 정말 예뻤어요!',
      image: '/placeholder-image.jpg',
      likes: 12,
      comments: 3,
      isLiked: false
    },
    {
      id: 2,
      user: '사용자2',
      content: '산책길에서 만난 고양이입니다',
      image: '/placeholder-image.jpg',
      likes: 8,
      comments: 1,
      isLiked: true
    },
    {
      id: 3,
      user: '사용자3',
      content: '오늘 점심 메뉴 추천해주세요!',
      image: '/placeholder-image.jpg',
      likes: 5,
      comments: 8,
      isLiked: false
    },
    {
      id: 4,
      user: '사용자4',
      content: '주말에 갈만한 곳 있나요?',
      image: '/placeholder-image.jpg',
      likes: 20,
      comments: 15,
      isLiked: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    // 댓글 페이지로 이동
    navigate(`/feed-detail/${postId}`);
  };

  const handleAddMission = () => {
    // 미션 등록 페이지로 이동
    navigate('/mission-registration');
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <Container>
      <Header>
        <Logo>로고/아이콘</Logo>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <ScrollableContent>
        <MissionCard onAddMission={handleAddMission} />
        
        <FeedSection>
          {posts.map(post => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDeletePost}
            />
          ))}
        </FeedSection>
      </ScrollableContent>

      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const BellIcon = styled.div`
  color: #666;
  cursor: pointer;
`;

const ScrollableContent = styled.div`
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 80px;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const FeedSection = styled.div`
  margin-top: 20px;
`;

export default TodayViewFeed;
