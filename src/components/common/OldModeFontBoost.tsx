import React from 'react';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';

const OldModeFontBoost: React.FC = () => {
  const { data } = useApiQuery(getMemberDetail(), ['member']);

  React.useEffect(() => {
    const root = document.documentElement;
    const isOld = data?.mode === 'OLD';
    if (isOld) {
      root.classList.add('old-mode');
    } else {
      root.classList.remove('old-mode');
    }
    return () => {
      root.classList.remove('old-mode');
    };
  }, [data?.mode]);

  return null;
};

export default OldModeFontBoost;
