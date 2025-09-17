import React from 'react';
import GuideOverlay from './GuideOverlay';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';
import useOneTimeFlag from '../../hooks/useOneTimeFlag';

type OldModeGuideProps = {
  pageKey: string;
  imageSrc: string;
  version?: string;
};

const OldModeGuide: React.FC<OldModeGuideProps> = ({
  pageKey,
  imageSrc,
  version = 'v1',
}) => {
  const { data: member } = useApiQuery(getMemberDetail(), ['member']);

  const memberId = member?.memberId ?? null;
  const mode = member?.mode ?? null;

  const { shouldShow, markSeen } = useOneTimeFlag({
    pageKey,
    memberId,
    mode,
    version,
  });

  if (!member || member.role !== 'ROLE_USER') return null;
  if (member.mode !== 'OLD') return null;
  if (!shouldShow) return null;

  return <GuideOverlay imageSrc={imageSrc} onClose={markSeen} />;
};

export default OldModeGuide;
