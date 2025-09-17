import React, { useRef } from 'react';
import * as S from '../CommentBottomSheet.styles';
import register from '../../../assets/feed/register.svg';
import { useAutoResizeTextArea } from '../../../hooks/useAutoResizeTextArea';

interface CommentInputProps {
  onSubmit: (text: string, cb?: () => void) => void;
  disabled?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit, disabled }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { autoResize } = useAutoResizeTextArea();

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    const value = textareaRef.current?.value ?? '';
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed, () => {
      if (textareaRef.current) {
        textareaRef.current.value = '';
        autoResize(textareaRef.current);
      }
    });
  };

  return (
    <S.InputBar
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <S.TextArea
        ref={textareaRef}
        rows={1}
        onInput={(e) => autoResize(e.currentTarget)}
        maxLength={300}
      />
      <S.SubmitBtn
        data-no-drag="true"
        type="submit"
        disabled={disabled}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        <img
          src={register}
          alt="등록"
          style={{ width: '100%', height: '100%' }}
        />
      </S.SubmitBtn>
    </S.InputBar>
  );
};

export default React.memo(CommentInput);
