import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Heart, MessageCircle, User, Trash2 } from 'lucide-react';
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
      user: '사용자2',
      content: '정말 아름다운 하늘이네요!',
      isMyComment: false
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
          </PostHeader>
          
          <PostContent>
            <PostText>{post.content}</PostText>
            <PostImage>
              <ImagePlaceholder>사진</ImagePlaceholder>
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
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e9ecef;
`;

const ImagePlaceholder = styled.span`
  color: #999;
  font-size: 14px;
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

export default FeedDetail;

