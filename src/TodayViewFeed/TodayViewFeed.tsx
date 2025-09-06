import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bell, Wifi, WifiOff, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MissionCard from './MissionCard';
import { useMission } from '../app/MissionContext';
import FeedPost from './FeedPost';
import BottomNavigation from '../components/BottomNavigation';
import { useFeed } from '../app/FeedContext';

const TodayViewFeed: React.FC = () => {
  const navigate = useNavigate();
  const { posts, likePost, addComment, deletePost, isOnline, pendingActions } = useFeed();
  const { currentMission, refreshMission } = useMission();
  const [showMissionBar, setShowMissionBar] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const handleLike = (postId: number) => {
    likePost(postId);
  };

  const handleComment = (postId: number) => {
    // 댓글 페이지로 이동 (카운트 증가 없이)
    navigate(`/feed-detail/${postId}`);
  };

  const handleAddMission = () => {
    // 미션 등록 페이지로 이동
    navigate('/mission-registration');
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId);
  };

  const handleAddPost = () => {
    navigate('/mission-registration');
  };

  const handleEditPost = (postId: number) => {
    navigate('/mission-registration', { state: { editPostId: postId } });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // 스크롤을 아래로 내리면 미션바 숨김, 위로 올리면 표시
      if (currentScrollY > scrollY && currentScrollY > 50) {
        setShowMissionBar(false);
      } else if (currentScrollY < scrollY || currentScrollY <= 50) {
        setShowMissionBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

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

      <MissionBar $show={showMissionBar}>
        <MissionCardWrap>
          <MissionTitle>오늘의 시선 MISSION</MissionTitle>
          <MissionDesc>{currentMission ? currentMission.text : '오늘 가장 인상적인 풍경을 공유해봐요!'}</MissionDesc>
        </MissionCardWrap>
        <BirdDecoration>
          <img src="/Maru_front.png" alt="마루" width={72} height={72} />
        </BirdDecoration>
      </MissionBar>

      <ScrollableContent>
        <FeedSection>
          {posts.map(post => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          ))}
        </FeedSection>
      </ScrollableContent>

      <FloatingAddButton onClick={handleAddPost}>
        <Plus size={24} />
      </FloatingAddButton>

      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #FAFAFA;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(180deg, #FF6A25 0%, #FFA66F 40%, rgba(255,255,255,0) 100%);
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MissionBar = styled.div<{ $show: boolean }>`
  position: sticky;
  top: 73px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 120;
  transform: translateY(${props => props.$show ? '0' : '-100%'});
  transition: transform 0.3s ease;
`;

const MissionCardWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 10px 24px rgba(255,106,37,0.12);
`;

const BirdDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -56%);
`;

const MissionTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #2F80ED;
  text-align: center;
`;

const MissionDesc = styled.div`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: center;
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

const FloatingAddButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: max(20px, calc((100vw - 480px) / 2 + 20px));
  width: 56px;
  height: 56px;
  background-color: #FF6A25;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 106, 37, 0.3);
  transition: all 0.2s;
  z-index: 100;

  &:hover {
    background-color: #ff7f47;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default TodayViewFeed;
