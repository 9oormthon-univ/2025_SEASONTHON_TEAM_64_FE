import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Upload } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMission } from '../app/MissionContext';
import { useFeed } from '../app/FeedContext';

const MissionRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPost } = useFeed();
  const { currentMission } = useMission();
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const isEditMode = Boolean((location.state as any)?.editPostId);

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
    // 피드에 게시글 추가 (이미지는 미리보기 dataURL 사용)
    addPost({
      user: '나',
      content: text.trim(),
      image: imagePreview || '/placeholder-image.jpg'
    });

    // 성공 후 피드로 이동 (토스트는 피드/오버레이로 별도 처리 가능)
    navigate('/');
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
        <MissionTitle style={{ color: "#3D8AFF", fontSize: "0.9rem" }}>
          오늘의 시선_MISSION
        </MissionTitle>

        <MissionDescription
          style={{ fontSize: "1.1rem", fontWeight: "bold" }}
        >
          {currentMission ? currentMission.text : '오늘 가장 인상적인 풍경을 공유해봐요.'}
        </MissionDescription>


        </MissionCard>



        <InputWrapper>
          <InputSection>
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
          </InputSection>

          <InputSection>
            <TextArea
              placeholder="200자 이내로 작성해주세요."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={200}
            />
            <CharCount>{text.length}/200</CharCount>
          </InputSection>
        </InputWrapper>



        <SubmitButton onClick={handleSubmit}>
          {isEditMode ? '수정하기' : '등록하기'}
        </SubmitButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(180deg, #FF6A25 0%, #FaFaFa 36%);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: transparent;
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
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 77%,   /* 위쪽: 완전 흰색 */
    rgba(255, 255, 255, 0.7) 100% /* 아래쪽: 70% 불투명 */
  );
  border-radius: 20px;
  padding: 16px 20px;
  margin-bottom: 56px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

const MissionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 4px 0;  /* 👈 간격 줄였음 (원래 8px → 4px) */
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

const InputWrapper = styled.div`
  background: #ffffff;
  border-radius: 20px; /* MissionCard와 통일 */
  padding: 20px;
  margin: 55px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
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
  border: 0px solid #e9ecef;
  resize: none; /* 👈 드래그 핸들 제거 */
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
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
  height: 220px;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
  background: #F2F2F2;
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
  border-radius: 12px;
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
  background-color: #FF6A25;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #ff7f47;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ffc2a5;
    cursor: not-allowed;
  }
`;

export default MissionRegistration;

