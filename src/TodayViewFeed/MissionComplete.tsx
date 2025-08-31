import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, User, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SlideUpContainer } from '../Styles/Animations';

const MissionComplete: React.FC = () => {
  const navigate = useNavigate();

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
            value=""
            readOnly
            maxLength={200}
          />
          <CharCount>0/200</CharCount>
        </InputSection>

        <InputSection>
          <InputLabel>사진</InputLabel>
          <ImageUploadArea>
            <UploadPlaceholder>
              <Upload size={32} />
              <UploadText>이미지를 선택하세요</UploadText>
              <UploadSize>0/10MB</UploadSize>
            </UploadPlaceholder>
          </ImageUploadArea>
          <SizeInfo>10MB 이하 파일만 업로드 가능합니다.</SizeInfo>
        </InputSection>

        <SubmitButton disabled>
          등록하기
        </SubmitButton>
      </Content>

      <ToastMessage>
        오늘의 시선을 공유했습니다.
      </ToastMessage>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
  position: relative;
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
  padding-bottom: 80px;
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
  background-color: #f8f9fa;
  color: #999;

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
  width: 100%;
  height: 200px;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
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

const SizeInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #ccc;
  color: #666;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: not-allowed;
`;

const ToastMessage = styled(SlideUpContainer)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1000;
`;

export default MissionComplete;

