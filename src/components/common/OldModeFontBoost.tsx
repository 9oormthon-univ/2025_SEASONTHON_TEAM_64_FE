import React from 'react';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';
import { hasToken } from '../../utils/authState';

const OldModeFontBoost: React.FC = () => {
  // 로그인/온보딩 화면에서는 토큰이 없어야 정상이며, 이때 쿼리를 막아 401 -> /login 무한 리다이렉트 방지
  const authed = hasToken();
  const { data } = useApiQuery(getMemberDetail(), ['member'], {
    queryKey: ['member'],
    enabled: authed,
  });

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
