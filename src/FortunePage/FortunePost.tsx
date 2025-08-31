import React from 'react';
import styled from 'styled-components';
import { Heart, MessageCircle, User, Star } from 'lucide-react';

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

interface FortunePostProps {
  post: FortunePost;
  onLike: (postId: number) => void;
  onBookmark: (postId: number) => void;
  onComment: (postId: number) => void;
}

const FortunePost: React.FC<FortunePostProps> = ({ post, onLike, onBookmark, onComment }) => {
  return (
    <PostCard>
      <PostHeader>
        <UserIcon>
          <User size={20} />
        </UserIcon>
        <UserName>{post.user}</UserName>
        <BookmarkButton 
          onClick={() => onBookmark(post.id)}
          $isBookmarked={post.isBookmarked}
        >
          <Star size={20} fill={post.isBookmarked ? 'currentColor' : 'none'} />
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
          onClick={() => onLike(post.id)}
          $isActive={post.isLiked}
        >
          <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
          <ActionText>{post.likes}</ActionText>
        </ActionButton>
        
        <ActionButton onClick={() => onComment(post.id)}>
          <MessageCircle size={20} />
          <ActionText>{post.comments}</ActionText>
        </ActionButton>
      </PostActions>
    </PostCard>
  );
};

const PostCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
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

export default FortunePost;
