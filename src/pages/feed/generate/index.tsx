import React, { useEffect, useRef, useState } from 'react';
import * as S from './index.styles';
import { useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { createFeed } from '../../../apis/feed';
import { getUserMission } from '../../../apis/mission';
import successVideo from '../../../assets/feed/generateSuccess.webm';
import back from '../../../assets/feed/left-arrow.svg';
import select from '../../../assets/feed/select-image.svg';
import { useToastContext } from '../../../components/toast/Toast';
import Header from '../../../components/feed/Header';
import MissionBox from '../../../components/feed/MissionBox';
import ContentBox from '../../../components/feed/ContentBox';
import SubmitButton from '../../../components/feed/SubmitButton';
import SuccessOverlay from '../../../components/feed/SuccessOverlay';

const FeedGenerate: React.FC = () => {
  const navigate = useNavigate();
  const { show } = useToastContext();
  const { data: userMission } = useApiQuery(getUserMission(), ['userMission']);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openFilePicker = () => fileInputRef.current?.click();

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = () => {
    if (!imageFile) {
      show('이미지를 먼저 업로드해주세요.', 'error', false);
      return;
    }
    if (!text.trim()) {
      show('텍스트를 작성해주세요.', 'error', false);
      return;
    }
    if (!userMission?.id) {
      show(
        '미션 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
        'error',
        false,
      );
      return;
    }

    setIsSubmitting(true);
    createFeed(
      { missionId: userMission.id, description: text.trim() },
      imageFile,
    )
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((error) => {
        console.log(error);
        show(
          error?.response?.data?.message ||
            '업로드에 실패했습니다. 다시 시도해주세요.',
          'error',
          false,
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      {isSuccess && <SuccessOverlay videoSrc={successVideo} />}
      <S.Container>
        <Header backIcon={back} onBack={() => navigate(-1)} />
        <MissionBox description={userMission?.description} />
        <ContentBox
          previewUrl={previewUrl}
          selectImageIcon={select}
          onPickImage={openFilePicker}
          fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          onChangeFile={onChangeFile}
          text={text}
          onChangeText={setText}
        />
        <SubmitButton
          onClick={handleSubmit}
          disabled={!imageFile || !text.trim() || !userMission?.id}
          isSubmitting={isSubmitting}
        />
      </S.Container>
    </>
  );
};

export default FeedGenerate;
