import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, MessageCircle, WifiOff, MoreVertical } from 'lucide-react';
import type { Post } from '../app/FeedContext';

interface FeedPostProps {
  post: Post;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit?: (postId: number) => void;
  onPostClick?: (postId: number) => void;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, onLike, onComment, onDelete, onEdit, onPostClick }) => {
  const isMyPost = post.user === '나' || post.user === '사용자1'; // 임시로 사용자1을 내 포스트로 설정
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setShowMenu(false);
    onEdit?.(post.id);
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(post.id);
    setShowDeleteConfirm(false);
  };

  const handlePostClick = () => {
    onPostClick?.(post.id);
  };

  return (
    <PostCard onClick={handlePostClick}>
      {isMyPost && (
        <PostMenu>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MoreVertical size={16} />
          </MenuButton>
          {showMenu && (
            <MenuDropdown>
              <MenuItem onClick={handleEdit}>수정하기</MenuItem>
              <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
            </MenuDropdown>
          )}
        </PostMenu>
      )}
      
      <PostHeader>
        <UserIcon>
          <img src="/Feed_maru.png" alt="마루" width={32} height={32} />
        </UserIcon>
        <UserName>{post.user}</UserName>
        {post.isOffline && (
          <OfflineIndicator title="오프라인에서 작성됨">
            <WifiOff size={12} />
          </OfflineIndicator>
        )}
      </PostHeader>
      
      <PostContent>
        <PostText>{post.content}</PostText>
        {post.image && post.image !== '/placeholder-image.jpg' && (
          <PostImage>
            <PostImg src={post.image} alt="post" />
          </PostImage>
        )}
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

      {showDeleteConfirm && (
        <DeleteOverlay>
          <DeleteCard>
            <DeleteText>게시글을 삭제하시겠습니까?</DeleteText>
            <DeleteButtons>
              <CancelButton onClick={() => setShowDeleteConfirm(false)}>취소</CancelButton>
              <ConfirmDeleteButton onClick={confirmDelete}>삭제하기</ConfirmDeleteButton>
            </DeleteButtons>
            <img src="/Maru_front.png" alt="마루" width={80} height={80} />
          </DeleteCard>
        </DeleteOverlay>
      )}
    </PostCard>
  );
};

const PostCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
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

const OfflineIndicator = styled.div`
  color: #6c757d;
  margin-left: 4px;
  padding: 2px;
  border-radius: 4px;
  background-color: #f8f9fa;
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


const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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

const PostMenu = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 10;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #666;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
  min-width: 120px;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const DeleteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(22, 22, 22, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DeleteCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DeleteText = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const DeleteButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const CancelButton = styled.button`
  background: none;
  border: 1px solid #e9ecef;
  color: #666;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;

const ConfirmDeleteButton = styled.button`
  background: none;
  border: none;
  color: #FF6A25;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;

export default FeedPost;

