import React from 'react';
import type { ChangeEvent } from 'react';
import * as S from './ContentBox.styles';

interface ContentBoxProps {
  previewUrl: string | null;
  selectImageIcon: string;
  onPickImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  onChangeText: (value: string) => void;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  previewUrl,
  selectImageIcon,
  onPickImage,
  fileInputRef,
  onChangeFile,
  text,
  onChangeText,
}) => {
  return (
    <S.Wrapper>
      <S.Preview
        src={previewUrl ?? selectImageIcon}
        alt="Select"
        onClick={onPickImage}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onChangeFile}
        style={{ display: 'none' }}
      />
      <S.TextArea
        placeholder="200자 이내로 작성해주세요."
        value={text}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </S.Wrapper>
  );
};

export default ContentBox;
