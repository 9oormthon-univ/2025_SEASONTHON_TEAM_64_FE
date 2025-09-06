import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Heart, MessageCircle, Send, X, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import type { Post } from '../app/FeedContext';
import { commentService, type CommentResponse } from '../services/commentService';
import { authService } from '../services/authService';

interface Comment {
  id: number;
  user: string;
  content: string;
  isMyComment: boolean;
  handle?: string;
  time?: string;
  commentId?: number;
  memberId?: number;
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
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // 모달이 열릴 때 body 스크롤 방지 및 댓글 로딩
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadComments();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, post.id]);

  // 댓글 로딩
  const loadComments = async () => {
    setIsLoadingComments(true);
    try {
      const response = await commentService.getCommentsCursor(post.id, undefined, 20);
      console.log('✅ 댓글 로딩 성공:', response);
      
      // API 응답을 Comment 형태로 변환
      const transformedComments: Comment[] = response.items.map(comment => ({
        id: comment.commentId,
        commentId: comment.commentId,
        memberId: comment.memberId,
        user: `사용자${comment.memberId}`, // 실제로는 회원 정보에서 가져와야 함
        content: comment.description,
        isMyComment: false, // 실제로는 현재 사용자와 비교해야 함
        handle: `@user${comment.memberId}`,
        time: formatTime(comment.createdAt)
      }));
      
      setComments(transformedComments);
    } catch (error) {
      console.error('❌ 댓글 로딩 실패:', error);
      // 폴백: 더미 댓글
      setComments([
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
    } finally {
      setIsLoadingComments(false);
    }
  };

  // 시간 포맷팅
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    
    return date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
  };

  const handleSendComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await commentService.createComment(post.id, {
          description: newComment.trim()
        });
        
        console.log('✅ 댓글 생성 성공:', response);
        
        // 새 댓글을 목록에 추가
        const newCommentObj: Comment = {
          id: response.commentId,
          commentId: response.commentId,
          memberId: response.memberId,
          user: '나',
          content: response.description,
          isMyComment: true,
          handle: '@me',
          time: formatTime(response.createdAt)
        };
        
        setComments(prev => [newCommentObj, ...prev]);
        setNewComment('');
        onComment(post.id);
      } catch (error) {
        console.error('❌ 댓글 생성 실패:', error);
        // 폴백: 로컬에 추가
        const comment: Comment = {
          id: Date.now(),
          user: '나',
          content: newComment.trim(),
          isMyComment: true,
          handle: '@me',
          time: '방금 전'
        };
        setComments(prev => [comment, ...prev]);
        setNewComment('');
        onComment(post.id);
      }
    }
  };

  const handleEditComment = (commentId: number) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingComment(commentId);
      setEditText(comment.content);
    }
  };

  const handleSaveEdit = async () => {
    if (editText.trim() && editingComment) {
      try {
        const response = await commentService.updateComment(editingComment, {
          description: editText.trim()
        });
        
        console.log('✅ 댓글 수정 성공:', response);
        
        setComments(prev => prev.map(comment => 
          comment.id === editingComment 
            ? { ...comment, content: response.description }
            : comment
        ));
        
        setEditingComment(null);
        setEditText('');
      } catch (error) {
        console.error('❌ 댓글 수정 실패:', error);
        // 폴백: 로컬 수정
        setComments(prev => prev.map(comment => 
          comment.id === editingComment 
            ? { ...comment, content: editText.trim() }
            : comment
        ));
        setEditingComment(null);
        setEditText('');
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await commentService.deleteComment(commentId);
        console.log('✅ 댓글 삭제 성공');
        
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('❌ 댓글 삭제 실패:', error);
        // 폴백: 로컬 삭제
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
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
              {isLoadingComments ? (
                <LoadingText>댓글을 불러오는 중...</LoadingText>
              ) : (
                comments.map(comment => (
                  <CommentItem key={comment.id}>
                    <CommentProfile>
                      <CommentProfileImage src="/Feed_maru.png" alt="프로필" />
                      <CommentInfo>
                        <CommentUserName>{comment.user}</CommentUserName>
                        <CommentUserHandle>{comment.handle}</CommentUserHandle>
                      </CommentInfo>
                      <CommentTime>{comment.time}</CommentTime>
                      {comment.isMyComment && (
                        <CommentMenu>
                          <CommentMenuButton onClick={() => handleEditComment(comment.id)}>
                            <Edit3 size={14} />
                          </CommentMenuButton>
                          <CommentMenuButton onClick={() => handleDeleteComment(comment.id)}>
                            <Trash2 size={14} />
                          </CommentMenuButton>
                        </CommentMenu>
                      )}
                    </CommentProfile>
                    {editingComment === comment.id ? (
                      <CommentEditSection>
                        <CommentEditInput
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSaveEdit();
                            }
                          }}
                        />
                        <CommentEditButtons>
                          <CommentEditButton onClick={handleSaveEdit}>저장</CommentEditButton>
                          <CommentEditButton onClick={() => {
                            setEditingComment(null);
                            setEditText('');
                          }}>취소</CommentEditButton>
                        </CommentEditButtons>
                      </CommentEditSection>
                    ) : (
                      <CommentContent>{comment.content}</CommentContent>
                    )}
                  </CommentItem>
                ))
              )}
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

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 14px;
`;

const CommentMenu = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const CommentMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #666;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const CommentEditSection = styled.div`
  margin-left: 44px;
  margin-top: 8px;
`;

const CommentEditInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  margin-bottom: 8px;
  
  &:focus {
    border-color: #FF6A25;
  }
`;

const CommentEditButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CommentEditButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-child {
    background-color: #FF6A25;
    color: white;
    border-color: #FF6A25;
    
    &:hover {
      background-color: #ff7f47;
    }
  }
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
