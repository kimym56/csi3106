import { QueryClient } from '@tanstack/react-query';
import ky from 'ky';

interface RefObject<T> {
  current: T | null;
}

export const tokenRef: RefObject<string> = { current: null };

export const queryClient = new QueryClient();

export const client = ky.create({
  prefixUrl: 'http://conact-service.cys.wo.tc/',
  hooks: {
    beforeRequest: [
      (request) => {
        if (!request.headers.has('authorization')) {
          const value = getAuthorizationHeader(tokenRef.current);

          if (value != null) {
            request.headers.set('authorization', value);
          }
        }
      },
    ],
  },
});

export const getAuthorizationHeader = (token: string | null = tokenRef.current) =>
  token != null ? `bearer ${token}` : null;
