import React, { useEffect, useRef, useState } from 'react';
import * as S from './index.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getFeedDetail, modifyFeed } from '../../../apis/feed';
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

const FeedModify: React.FC = () => {
  const navigate = useNavigate();
  const { feedId } = useParams();
  const numericFeedId = Number(feedId);
  const { show } = useToastContext();
  const { data: userMission } = useApiQuery(getUserMission(), ['userMission']);
  const {
    data: existingFeed,
    isLoading: isLoadingFeed,
    error: feedError,
  } = useApiQuery(getFeedDetail(numericFeedId), ['feedDetail', numericFeedId]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prepareInitial = async () => {
      if (!existingFeed) return;
      setText(existingFeed.description);
      setPreviewUrl(existingFeed.imageUrl);
      setInitialImageUrl(existingFeed.imageUrl);
      try {
        const res = await fetch(existingFeed.imageUrl, { cache: 'no-store' });
        const blob = await res.blob();
        const ext = blob.type.split('/')[1] || 'jpg';
        const file = new File([blob], `existing.${ext}`, { type: blob.type });
        setImageFile(file);
      } catch (e) {
        console.warn('기존 이미지 파일 변환 실패', e);
      }
    };
    prepareInitial();
  }, [existingFeed]);

  const openFilePicker = () => fileInputRef.current?.click();

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev && prev !== initialImageUrl) URL.revokeObjectURL(prev);
      return url;
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== initialImageUrl)
        URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, initialImageUrl]);

  const handleSubmit = () => {
    if (!text.trim()) {
      show('텍스트를 작성해주세요.', 'error', false);
      return;
    }
    if (!numericFeedId) {
      show('잘못된 피드 ID 입니다.', 'error', false);
      return;
    }
    if (!imageFile) {
      show('이미지 준비 중입니다. 잠시 후 다시 시도해주세요.', 'error', false);
      return;
    }

    setIsSubmitting(true);
    modifyFeed(numericFeedId, { description: text.trim() }, imageFile)
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((error) => {
        console.log(error);
        show(
          error?.response?.data?.message ||
            '수정에 실패했습니다. 다시 시도해주세요.',
          'error',
          false,
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoadingFeed) {
    return <S.Container>피드 정보를 불러오는 중...</S.Container>;
  }
  if (feedError || !existingFeed) {
    return (
      <S.Container>
        피드 정보를 불러오지 못했습니다.
        <br />
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </S.Container>
    );
  }

  const canSubmit =
    !!imageFile &&
    text.trim() &&
    (text.trim() !== existingFeed.description ||
      imageFile.name.startsWith('existing.') === false);

  return (
    <>
      {isSuccess && (
        <SuccessOverlay
          videoSrc={successVideo}
          message="수정이 완료되었습니다!"
        />
      )}
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
          disabled={!canSubmit || isSubmitting}
          isSubmitting={isSubmitting}
        />
      </S.Container>
    </>
  );
};

export default FeedModify;
