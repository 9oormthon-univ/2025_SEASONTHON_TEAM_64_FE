import React from 'react';
import styled from 'styled-components';
import { Bell, Wifi, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MissionCard from './MissionCard';
import FeedPost from './FeedPost';
import BottomNavigation from './BottomNavigation';
import { useFeed } from '../app/FeedContext';

const TodayViewFeed: React.FC = () => {
  const navigate = useNavigate();
  const { posts, likePost, addComment, deletePost, isOnline, pendingActions } = useFeed();

  const handleLike = (postId: number) => {
    likePost(postId);
  };

  const handleComment = (postId: number) => {
    addComment(postId);
    // 댓글 페이지로 이동
    navigate(`/feed-detail/${postId}`);
  };

  const handleAddMission = () => {
    // 미션 등록 페이지로 이동
    navigate('/mission-registration');
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId);
  };

  return (
    <Container>
      <Header>
        <Logo>로고/아이콘</Logo>
        <HeaderRight>
          <ConnectionStatus>
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            <StatusText $isOnline={isOnline}>
              {isOnline ? '온라인' : '오프라인'}
            </StatusText>
            {pendingActions.length > 0 && (
              <PendingBadge>{pendingActions.length}</PendingBadge>
            )}
          </ConnectionStatus>
          <BellIcon>
            <Bell size={24} />
          </BellIcon>
        </HeaderRight>
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

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #f8f9fa;
  position: relative;
`;

const StatusText = styled.span<{ $isOnline: boolean }>`
  font-size: 12px;
  color: ${props => props.$isOnline ? '#28a745' : '#dc3545'};
  font-weight: 500;
`;

const PendingBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ff6b6b;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
