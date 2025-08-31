import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Plus, Trash2 } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  content: string;
  isMyComment: boolean;
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
        {comments.map(comment => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <UserIcon>
                <User size={16} />
              </UserIcon>
              <CommentUser>{comment.user}</CommentUser>
              {comment.isMyComment && (
                <DeleteButton onClick={() => onDeleteComment(postId, comment.id)}>
                  <Trash2 size={14} />
                  <DeleteText>댓글 삭제</DeleteText>
                </DeleteButton>
              )}
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
          </CommentItem>
        ))}
      </CommentList>
      
      <CommentInput>
        <UserIcon>
          <User size={16} />
        </UserIcon>
        <Input
          type="text"
          placeholder="댓글 달기"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <SendButton onClick={handleSubmit}>
          전송
        </SendButton>
      </CommentInput>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 16px;
  border-top: 1px solid #e9ecef;
  padding-top: 16px;
`;

const CommentList = styled.div`
  margin-bottom: 16px;
`;

const CommentItem = styled.div`
  margin-bottom: 12px;
  padding: 8px 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const UserIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #666;
`;

const CommentUser = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-right: auto;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const DeleteText = styled.span`
  font-size: 12px;
`;

const CommentContent = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  padding-left: 32px;
  line-height: 1.4;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default CommentSection;

