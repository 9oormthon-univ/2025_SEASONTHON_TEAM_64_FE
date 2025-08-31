import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Star, Heart, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FortunePost from './FortunePost';

interface FortunePost {
  id: number;
  user: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const FortunePage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FortunePost[]>([
    {
      id: 1,
      user: '사용자1',
      content: '오늘 운세가 좋네요! 행운이 가득할 것 같아요.',
      image: '/placeholder-image.jpg',
      likes: 15,
      comments: 5,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      user: '사용자2',
      content: '오늘은 조심해야 할 것 같아요. 차분하게 보내세요.',
      image: '/placeholder-image.jpg',
      likes: 8,
      comments: 3,
      isLiked: true,
      isBookmarked: true
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    navigate(`/fortune-detail/${postId}`);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>오늘의 운세</Title>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <FortuneCard>
          <CardTitle>🔮 오늘의 운세</CardTitle>
          <CardDescription>
            오늘 하루의 운세를 확인하고 공유해보세요.
          </CardDescription>
          <LuckyElements>
            <LuckyElement>
              <ElementIcon>🍀</ElementIcon>
              <ElementText>행운의 아이템</ElementText>
            </LuckyElement>
            <LuckyElement>
              <ElementIcon>🌈</ElementIcon>
              <ElementText>행운의 색깔</ElementText>
            </LuckyElement>
          </LuckyElements>
        </FortuneCard>

        <FeedSection>
          {posts.map(post => (
            <FortunePost
              key={post.id}
              post={post}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onComment={handleComment}
            />
          ))}
        </FeedSection>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const BellIcon = styled.div`
  color: #666;
  cursor: pointer;
`;

const Content = styled.main`
  padding: 20px;
`;

const FortuneCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  color: white;
  text-align: center;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 12px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  margin: 0 0 20px 0;
  opacity: 0.9;
  line-height: 1.4;
`;

const LuckyElements = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const LuckyElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ElementIcon = styled.div`
  font-size: 24px;
`;

const ElementText = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;

const FeedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default FortunePage;
