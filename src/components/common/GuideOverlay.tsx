import React from 'react';
import styled from '@emotion/styled';

type GuideOverlayProps = {
  imageSrc: string;
  onClose: () => void;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20000;
  background: rgba(0, 0, 0, 0.4);
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: calc(
    100vh -
      3px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)
  );
  object-fit: fill;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuideOverlay: React.FC<GuideOverlayProps> = ({ imageSrc, onClose }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <Backdrop onClick={onClose}>
      <Container onClick={onClose}>
        <Image src={imageSrc} alt="guide" />
      </Container>
    </Backdrop>
  );
};

export default GuideOverlay;
