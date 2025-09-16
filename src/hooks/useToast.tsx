import { useCallback } from 'react';
import { useToastContext } from '../components/toast/Toast';

const useToast = () => {
  const ctx = useToastContext();

  const show = useCallback(
    (message: string, type: 'error' | 'info' = 'info') => {
      ctx.show(message, type);
    },
    [ctx],
  );

  return { show };
};

export default useToast;
