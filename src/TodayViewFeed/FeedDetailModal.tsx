import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Heart, MessageCircle, Send, X } from 'lucide-react';
import type { Post } from '../app/FeedContext';

interface Comment {
  id: number;
  user: string;
  content: string;
  isMyComment: boolean;
  handle?: string;
  time?: string;
}

interface FeedDetailModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
}

const FeedDetailModal: React.FC<FeedDetailModalProps> = ({ 
  post, 
  isOpen, 
  onClose, 
  onLike, 
  onComment 
}) => {
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

  const [newComment, setNewComment] = useState('');

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: '나',
        content: newComment.trim(),
        isMyComment: true,
        handle: '@me',
        time: '방금 전'
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
      onComment(post.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <BackButton onClick={onClose}>
            <ArrowLeft size={24} />
          </BackButton>
          <ModalTitle>게시글</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <PostSection>
            <PostHeader>
              <UserProfile>
                <ProfileImage src="/Feed_maru.png" alt="프로필" />
                <UserInfo>
                  <UserName>{post.user}</UserName>
                  <UserHandle>@abcde.000</UserHandle>
                </UserInfo>
              </UserProfile>
            </PostHeader>

            <PostContent>
              <PostText>{post.content}</PostText>
              {post.image && post.image !== '/placeholder-image.jpg' && (
                <PostImage src={post.image} alt="게시글 이미지" />
              )}
            </PostContent>

            <PostActions>
              <ActionButton onClick={() => onLike(post.id)}>
                <Heart size={20} fill={post.isLiked ? '#ff6b6b' : 'none'} color={post.isLiked ? '#ff6b6b' : '#666'} />
                <ActionText>{post.likes}</ActionText>
              </ActionButton>
              <ActionButton>
                <MessageCircle size={20} color="#666" />
                <ActionText>{post.comments}</ActionText>
              </ActionButton>
            </PostActions>
          </PostSection>

          <CommentsSection>
            <CommentsHeader>댓글 {comments.length}개</CommentsHeader>
            <CommentsList>
              {comments.map(comment => (
                <CommentItem key={comment.id}>
                  <CommentProfile>
                    <CommentProfileImage src="/Feed_maru.png" alt="프로필" />
                    <CommentInfo>
                      <CommentUserName>{comment.user}</CommentUserName>
                      <CommentUserHandle>{comment.handle}</CommentUserHandle>
                    </CommentInfo>
                    <CommentTime>{comment.time}</CommentTime>
                  </CommentProfile>
                  <CommentContent>{comment.content}</CommentContent>
                </CommentItem>
              ))}
            </CommentsList>
          </CommentsSection>
        </ModalContent>

        <CommentInputSection>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="댓글을 입력하세요..."
          />
          <SendButton onClick={handleSendComment} disabled={!newComment.trim()}>
            <Send size={20} />
          </SendButton>
        </CommentInputSection>
      </ModalContainer>
    </ModalOverlay>
  );
};

// 스타일 컴포넌트들
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 480px;
  height: 90vh;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: white;
  border-radius: 20px 20px 0 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

const PostSection = styled.div`
  padding: 20px;
  border-bottom: 8px solid #f8f9fa;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const UserHandle = styled.div`
  font-size: 14px;
  color: #666;
`;

const PostContent = styled.div`
  margin-bottom: 16px;
`;

const PostText = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 12px;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

const PostActions = styled.div`
  display: flex;
  gap: 24px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ActionText = styled.span`
  font-size: 14px;
  color: #666;
`;

const CommentsSection = styled.div`
  padding: 20px;
`;

const CommentsHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 16px 0;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CommentUserName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const CommentUserHandle = styled.div`
  font-size: 12px;
  color: #666;
`;

const CommentTime = styled.div`
  font-size: 12px;
  color: #999;
`;

const CommentContent = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  margin-left: 44px;
`;

const CommentInputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: white;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #FF6A25;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #FF6A25;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #ff7f47;
  }
`;

export default FeedDetailModal;
