import React, { useEffect, useRef, useState } from 'react';
import * as S from './Generate.styles';

import back from '../assets/BackIcon.svg';
import notify from '../assets/notify.svg';
import select from '../assets/SelectImage.svg';
import successVideo from '../assets/generateSuccess.webm';
import { useNavigate } from 'react-router-dom';
import {
  useApiMutation,
  useApiQuery,
} from '../../../apis/config/builder/ApiBuilder';
import {
  generateFeed,
  getTodayMission,
  uploadImage,
} from '../../../apis/mission';

const Generate = () => {
  const navigate = useNavigate();
  const { data: todayMissionData } = useApiQuery(getTodayMission(), [
    'todayMission',
  ]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync: uploadImageMutate, isPending: isUploading } =
    useApiMutation<FormData, string>(uploadImage());

  const openFilePicker = () => fileInputRef.current?.click();

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    // 업로드 호출
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await uploadImageMutate(formData);
      console.log(res);
      setUploadedImageUrl(res);
    } catch (err) {
      console.error('이미지 업로드 실패', err);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = () => {
    if (!uploadedImageUrl) {
      alert('이미지를 먼저 업로드해주세요.');
      return;
    }

    if (!text) {
      alert('텍스트를 작성해주세요.');
      return;
    }

    generateFeed({
      description: text,
      imageUrl: uploadedImageUrl,
      missionId: todayMissionData ? todayMissionData.mission.id : 0,
    })
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/');
          setIsSuccess(false);
        }, 4000);
      })
      .catch((err) => {
        console.error('피드 등록 실패', err);
        alert('피드 등록에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <>
      {isSuccess && (
        <S.SuccessBackground>
          <S.SuccessText>오늘의 시선을 공유했어요!</S.SuccessText>
          <S.SuccessVideo src={successVideo} autoPlay muted playsInline />
        </S.SuccessBackground>
      )}
      <S.Container>
        <S.ImageWrapper>
          <S.Back src={back} alt="Logo" onClick={() => navigate(-1)} />
          <S.ImageText>게시하기</S.ImageText>
          <S.Notify src={notify} alt="Notification" />
        </S.ImageWrapper>
        <S.TodayMissionBox>
          <S.MissionTitle>오늘의 미션</S.MissionTitle>
          <S.MissionContent>
            {todayMissionData?.mission.title || '미션 내용이 없습니다.'}
          </S.MissionContent>
        </S.TodayMissionBox>
        <S.TextBoxSection>
          <S.SelectImage
            src={previewUrl ?? select}
            alt="Select"
            onClick={openFilePicker}
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
            onChange={(e) => setText(e.target.value)}
          />
        </S.TextBoxSection>
        <S.Button onClick={handleSubmit}>등록하기</S.Button>
      </S.Container>
    </>
  );
};

export default Generate;
