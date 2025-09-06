import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bell, Wifi, WifiOff, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMission } from '../app/MissionContext';
import FeedPost from './FeedPost';
import FeedDetailModal from './FeedDetailModal';
import BottomNavigation from '../components/BottomNavigation';
import { useFeed } from '../app/FeedContext';
import type { Post } from '../app/FeedContext';

const TodayViewFeed: React.FC = () => {
  const navigate = useNavigate();
  const { posts, likePost, deletePost, addComment, isOnline, pendingActions } = useFeed();
  const { currentMission } = useMission();
  const [showMissionBar, setShowMissionBar] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (postId: number) => {
    likePost(postId);
  };

  const handleComment = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setIsModalOpen(true);
    }
  };


  const handleDeletePost = (postId: number) => {
    deletePost(postId);
  };

  const handleAddPost = () => {
    // 현재 미션 ID가 있으면 URL에 포함해서 이동
    if (currentMission) {
      navigate(`/mission-registration/${currentMission.id}`);
      console.log('📝 미션 ID와 함께 게시글 작성 페이지로 이동:', currentMission.id);
    } else {
      navigate('/mission-registration');
      console.log('📝 기본 게시글 작성 페이지로 이동');
    }
  };

  const handleEditPost = (postId: number) => {
    navigate('/mission-registration', { state: { editPostId: postId } });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleModalComment = (postId: number) => {
    addComment(postId);
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
        <Logo>
          <img src="/MaruLogo.svg" alt="마루 로고" width={88} height={21} />
        </Logo>
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
        <MissionCard>
            <MissionTitle style={{ color: "#3D8AFF", fontSize: "0.9rem" }}>
              오늘의 시선_MISSION
            </MissionTitle>
            <MissionDescription
              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              {currentMission ? currentMission.text : '오늘 가장 인상적인 풍경을 공유해봐요.'}
            </MissionDescription>
        </MissionCard>
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
              onPostClick={handleComment}
            />
          ))}
        </FeedSection>
      </ScrollableContent>

      <FloatingAddButton onClick={handleAddPost}>
        <Plus size={24} />
      </FloatingAddButton>

      <BottomNavigation />

      {selectedPost && (
        <FeedDetailModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLike={handleLike}
          onComment={handleModalComment}
        />
      )}
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
  background: linear-gradient( #FF6A25 100%, #FFA66F 40%, rgba(255,255,255,0) 100%);
  border-bottom: 0px solid #f0f0f0;ㅣ
  position: sticky;
  z-index: 100;
`;

const MissionBar = styled.div<{ $show: boolean }>`
  position: sticky;
  top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px 50px;
  background: linear-gradient(180deg, #FF6A25 0%, #FFA66F 40%, rgba(255,255,255,0) 100%);
  z-index: 120;
  transform: translateY(${props => props.$show ? '0' : '-100%'});
  transition: transform 0.3s ease;
`;

const MissionCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 77%,   /* 위쪽: 완전 흰색 */
    rgba(255, 255, 255, 0.7) 100% /* 아래쪽: 70% 불투명 */
  ) !important;
  border-radius: 20px !important;
  padding: 16px 20px !important;
  margin-bottom: 0px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
  text-align: center !important;
`;

const BirdDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -56%);
`;

const MissionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #3D8AFF;
  margin: 0 0 4px 0;
`;

const MissionDescription = styled.div`
  font-size: 14px;
  color: #2B2C2F;
  margin: 0;
  line-height: 1.4;
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
