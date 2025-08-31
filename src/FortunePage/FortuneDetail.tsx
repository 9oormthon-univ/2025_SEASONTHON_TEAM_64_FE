import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Heart, MessageCircle, User, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentSection from '../TodayViewFeed/CommentSection';

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

interface Comment {
  id: number;
  user: string;
  content: string;
  isMyComment: boolean;
}

const FortuneDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post] = useState<FortunePost>({
    id: Number(id) || 1,
    user: '사용자1',
    content: '오늘 운세가 좋네요! 행운이 가득할 것 같아요.',
    image: '/placeholder-image.jpg',
    likes: 15,
    comments: 5,
    isLiked: false,
    isBookmarked: false
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: '사용자2',
      content: '정말 좋은 운세네요! 저도 행운을 빌어요.',
      isMyComment: false
    }
  ]);

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
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
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <PostCard>
          <PostHeader>
            <UserIcon>
              <User size={20} />
            </UserIcon>
            <UserName>{post.user}</UserName>
            <BookmarkButton 
              onClick={handleBookmark}
              $isBookmarked={isBookmarked}
            >
              <Star size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
            </BookmarkButton>
          </PostHeader>
          
          <PostContent>
            <PostText>{post.content}</PostText>
            <PostImage>
              <ImagePlaceholder>🔮 운세 이미지</ImagePlaceholder>
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

const BellIcon = styled.div`
  color: #666;
  cursor: pointer;
`;

const Content = styled.main`
  padding: 20px;
`;

const PostCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #666;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;
`;

const BookmarkButton = styled.button<{ $isBookmarked: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$isBookmarked ? '#ffd700' : '#666'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
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
  height: 200px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e9ecef;
`;

const ImagePlaceholder = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const PostActions = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${props => props.$isActive ? '#e74c3c' : '#666'};
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ActionText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export default FortuneDetail;
