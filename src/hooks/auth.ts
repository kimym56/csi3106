import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { authAtom } from '../atoms/auth';
import { obtainToken } from '../remotes/auth';

interface UseLoginOptions {
  onError?: () => void;
}

export function useLogin({ onError }: UseLoginOptions) {
  const update = useSetAtom(authAtom);

  return useMutation(obtainToken, {
    onSuccess({ token }) {
      update({ type: 'login', token });
    },
    onError,
  });
}

export function useLogout() {
  const update = useSetAtom(authAtom);

  return useCallback(() => {
    update({ type: 'logout' });
  }, [update]);
}
