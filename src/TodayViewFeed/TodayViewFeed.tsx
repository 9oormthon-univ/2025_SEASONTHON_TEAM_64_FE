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

  return (
    <Container>
      <Header>
        <Logo>로고/아이콘</Logo>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <MissionCard onAddMission={handleAddMission} />
        
        <FeedSection>
          {posts.map(post => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </FeedSection>
      </Content>

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

const Content = styled.main`
  padding: 0 20px;
  padding-bottom: 80px;
`;

const FeedSection = styled.div`
  margin-top: 20px;
`;

export default TodayViewFeed;
