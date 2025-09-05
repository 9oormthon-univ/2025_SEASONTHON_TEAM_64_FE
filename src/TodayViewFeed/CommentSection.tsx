import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, MoreVertical } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  content: string;
  isMyComment: boolean;
  handle?: string;
  time?: string;
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  onAddComment: (postId: number, content: string) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onAddComment,
  onDeleteComment
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <Container>
      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <UserIcon>
                <img src="/Feed_maru.png" alt="마루" width={24} height={24} />
              </UserIcon>
              <CommentUserInfo>
                <CommentUser>{comment.user}</CommentUser>
                <CommentHandle>{comment.handle || `@${comment.user.toLowerCase()}_${index + 1}`}</CommentHandle>
              </CommentUserInfo>
              <CommentTime>{comment.time || '09.01'}</CommentTime>
              {comment.isMyComment && (
                <DeleteButton onClick={() => onDeleteComment(postId, comment.id)}>
                  삭제하기
                </DeleteButton>
              )}
              {!comment.isMyComment && (
                <KebabButton>
                  <MoreVertical size={16} />
                </KebabButton>
              )}
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
          </CommentItem>
        ))}
      </CommentList>
      
      <CommentInput>
        <Input
          type="text"
          placeholder="댓글 달기"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <SendButton onClick={handleSubmit}>
          <Send size={20} />
        </SendButton>
      </CommentInput>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 20px;
  border-top: 1px solid #e9ecef;
  padding-top: 16px;
`;

const CommentList = styled.div`
  margin-bottom: 16px;
`;

const CommentItem = styled.div`
  margin-bottom: 16px;
  padding: 8px 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FF6A25;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  overflow: hidden;
`;

const CommentUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CommentUser = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const CommentHandle = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const CommentTime = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: auto;
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #FF6A25;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const KebabButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const CommentContent = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  padding-left: 44px;
  line-height: 1.5;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f2f2f2;
  border-radius: 24px;
  margin-top: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  color: #333;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  background-color: #FF6A25;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff7f47;
  }
`;

export default CommentSection;

