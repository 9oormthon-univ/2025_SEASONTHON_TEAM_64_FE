import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, User, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MissionRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('10MB 이하 파일만 업로드 가능합니다.');
        return;
      }
      setImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() && !image) {
      alert('텍스트나 이미지를 입력해주세요.');
      return;
    }
    
    // 성공적으로 등록된 후 완료 페이지로 이동
    navigate('/mission-complete');
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
        <MissionCard>
          <MissionTitle>&lt;오늘의 시선_MISSION&gt;</MissionTitle>
          <MissionDescription>
            오늘 가장 인상적인 풍경을 공유해봐요.
          </MissionDescription>
        </MissionCard>

        <UserSection>
          <UserIcon>
            <User size={20} />
          </UserIcon>
          <UserLabel>나</UserLabel>
        </UserSection>

        <InputSection>
          <InputLabel>글 작성</InputLabel>
          <TextArea
            placeholder="200자 이내로 작성해주세요."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
          />
          <CharCount>{text.length}/200</CharCount>
        </InputSection>

        <InputSection>
          <InputLabel>사진</InputLabel>
          <ImageUploadArea>
            {imagePreview ? (
              <ImagePreview src={imagePreview} alt="미리보기" />
            ) : (
              <UploadPlaceholder>
                <Upload size={32} />
                <UploadText>이미지를 선택하세요</UploadText>
                <UploadSize>0/10MB</UploadSize>
              </UploadPlaceholder>
            )}
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageUploadArea>
          <SizeInfo>10MB 이하 파일만 업로드 가능합니다.</SizeInfo>
        </InputSection>

        <SubmitButton onClick={handleSubmit}>
          등록하기
        </SubmitButton>
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

const MissionCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e9ecef;
`;

const MissionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
`;

const MissionDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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

const UserLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const InputSection = styled.div`
  margin-bottom: 24px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const ImageUploadArea = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #007bff;
  }
`;

const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #999;
`;

const UploadText = styled.span`
  font-size: 14px;
`;

const UploadSize = styled.span`
  font-size: 12px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const SizeInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #333;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default MissionRegistration;

