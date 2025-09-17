import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './index.styles';
import backIcon from '../../../assets/information/left-arrow.svg';
import selectImage from '../../../assets/information/select-image.svg';
import food from '../../../assets/information/food.svg';
import etc from '../../../assets/information/etc.svg';
import hospital from '../../../assets/information/hospital.svg';
import addressIcon from '../../../assets/information/address.svg';
import success from '../../../assets/gif/information.gif';
import { useNavigate } from 'react-router-dom';
import AddressSearch, {
  type AddressSearchValue,
} from '../../../components/address/AddressSearch';
import { createInformation } from '../../../apis/information';
import { useToastContext } from '../../../components/toast/Toast';
import SuccessOverlay from '../../../components/feed/SuccessOverlay';
import OldModeGuide from '../../../components/common/OldModeGuide';
import infoGenerateGuide from '../../../assets/oldmode/information_generate_guide.jpg';

const categories = [
  { label: '병원/시설', value: 'HOSPITAL_FACILITIES' },
  { label: '외식/카페', value: 'RESTAURANT_CAFE' },
  { label: '기타', value: 'ETC' },
];

const InformationGenerate = () => {
  const navigate = useNavigate();
  const { show } = useToastContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [address, setAddress] = useState<AddressSearchValue | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isValid = useMemo(
    () => !!title.trim() && !!description.trim() && !!category && !!address,
    [title, description, category, address],
  );

  const handleSubmit = () => {
    if (!title.trim()) {
      show('제목을 입력하세요.', 'error', false);
      return;
    }
    if (!description.trim()) {
      show('내용을 입력하세요.', 'error', false);
      return;
    }
    if (!category) {
      show('종류를 선택하세요.', 'error', false);
      return;
    }
    if (!address?.displayName) {
      show('주소를 등록하세요.', 'error', false);
      return;
    }

    setIsSubmitting(true);
    const safeAddress = address as AddressSearchValue;
    const safeCategory = category as string;
    createInformation(
      {
        title: title.trim(),
        description: description.trim(),
        address: safeAddress.displayName,
        category: safeCategory,
      },
      imageFile ? [imageFile] : null,
    )
      .execute()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/info');
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        show(
          error?.response?.data?.message ||
            '등록에 실패했어요. 다시 시도해주세요.',
          'error',
          false,
        );
      })
      .finally(() => setIsSubmitting(false));
  };

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
    e.currentTarget.value = '';
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <>
      <OldModeGuide
        pageKey="information-generate"
        imageSrc={infoGenerateGuide}
        version="v1"
      />
      {isSuccess && (
        <SuccessOverlay
          imageSrc={success}
          message="내 정보가 등록되었습니다!"
        />
      )}
      <AddressSearch
        open={isAddressOpen}
        onClose={() => setIsAddressOpen(false)}
        onSelect={(value) => setAddress(value)}
      />
      <S.Container>
        <S.Header>
          <img src={backIcon} alt="back" onClick={() => navigate(-1)} />
          <S.HeaderTitle>정보 등록하기</S.HeaderTitle>
        </S.Header>
        <S.ContentBox>
          <S.InputTitleSection>
            <S.InputTitleLabel>제목 : </S.InputTitleLabel>
            <S.InputTitle
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </S.InputTitleSection>
          <S.ContentSection>
            <S.SelectImageWrapper onClick={openFilePicker}>
              <S.SelectImageBox src={previewUrl ?? selectImage} alt="select" />
            </S.SelectImageWrapper>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onChangeFile}
              style={{ display: 'none' }}
            />
            <S.ContentTextArea
              placeholder="내용을 입력하세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {address ? (
              <S.AddressText>
                <img src={addressIcon} alt="address" />
                <div onClick={() => setIsAddressOpen(true)}>
                  {address.displayName}
                </div>
              </S.AddressText>
            ) : (
              <S.AddressButton onClick={() => setIsAddressOpen(true)}>
                주소등록
              </S.AddressButton>
            )}
          </S.ContentSection>
        </S.ContentBox>
        <S.CategoryText>종류</S.CategoryText>
        <S.CategoryButtonList>
          {categories.map((cat) => (
            <S.CategoryButtonSection key={cat.value}>
              <S.CategoryImage
                src={
                  cat.value === 'HOSPITAL_FACILITIES'
                    ? hospital
                    : cat.value === 'RESTAURANT_CAFE'
                      ? food
                      : etc
                }
                alt={cat.label}
              />
              <S.CategoryButton
                isSelected={category === cat.value}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </S.CategoryButton>
            </S.CategoryButtonSection>
          ))}
        </S.CategoryButtonList>
        <S.Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
          {isSubmitting ? '등록 중...' : '등록하기'}
        </S.Button>
      </S.Container>
    </>
  );
};

export default InformationGenerate;
