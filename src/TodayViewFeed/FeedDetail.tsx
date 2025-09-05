import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Heart, MessageCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';

interface Post {
  id: number;
  user: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Comment {
  id: number;
  user: string;
  content: string;
  isMyComment: boolean;
  handle?: string;
  time?: string;
}

const FeedDetail: React.FC = () => {
  const navigate = useNavigate();
  const [post] = useState<Post>({
    id: 1,
    user: '사용자1',
    content: '오늘 하늘 정말 예뻤어요!',
    image: '/placeholder-image.jpg',
    likes: 12,
    comments: 3,
    isLiked: false
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: '쿵야',
      content: '하늘이 너무 맑네요! 오늘도 좋은하루 보내세요~',
      isMyComment: false,
      handle: '@addffgg',
      time: '09.01'
    },
    {
      id: 2,
      user: '마루',
      content: '쿵야님도 좋은 하루 보내세요.',
      isMyComment: true,
      handle: '@abcde.000',
      time: '5분 전'
    },
    {
      id: 3,
      user: '사과',
      content: '완전 가을 하늘이네요 ㅎㅎ',
      isMyComment: false,
      handle: '@apple_119',
      time: '09.01'
    }
  ]);

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = (postId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      user: '나',
      content,
      isMyComment: true
    };
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </BackButton>
        <HeaderTitle>노청마루</HeaderTitle>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <PostCard>
          <BirdDecoration>
            <img src="/Maru_front.png" alt="마루" width={60} height={60} />
          </BirdDecoration>
          <PostHeader>
            <UserIcon>
              <img src="/Feed_maru.png" alt="마루" width={32} height={32} />
            </UserIcon>
            <UserInfo>
              <UserName>{post.user}</UserName>
              <UserHandle>@abcde.000</UserHandle>
            </UserInfo>
          </PostHeader>
          
          <PostContent>
            <PostText>{post.content}</PostText>
            <PostImage>
              <PostImg src="/placeholder-image.jpg" alt="post" />
            </PostImage>
          </PostContent>
          
          <PostActions>
            <ActionButton 
              onClick={handleLike}
              $isActive={isLiked}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              <ActionText>{likeCount}</ActionText>
            </ActionButton>
            
            <ActionButton>
              <MessageCircle size={20} />
              <ActionText>{comments.length}</ActionText>
            </ActionButton>
          </PostActions>
        </PostCard>

        <CommentSection
          postId={post.id}
          comments={comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #FAFAFA;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(180deg, #FF6A25 0%, #FFA66F 40%, rgba(255,255,255,0) 100%);
  position: relative;
  z-index: 100;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0;
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

const BellIcon = styled.div`
  color: #666;
  cursor: pointer;
`;

const Content = styled.main`
  padding: 20px;
`;

const PostCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #e9ecef;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
`;

const BirdDecoration = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 20px;
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #FF6A25;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const UserHandle = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const PostContent = styled.div`
  margin-bottom: 16px;
`;

const PostText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const PostImage = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  margin: 12px 0;
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostActions = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${props => props.$isActive ? '#FF6A25' : '#666'};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ActionText = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export default FeedDetail;

