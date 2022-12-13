import { atom } from 'jotai';
import { atomWithDefault, atomWithStorage } from 'jotai/utils';
import { AuthState, AuthStatus, AuthStorage } from '../models/auth';
import { client, getAuthorizationHeader, queryClient, tokenRef } from '../utils/network';
import { storage } from '../utils/storage';

type AuthUpdate = { type: 'login'; token: string } | { type: 'logout' };

const authStorageAtom = atomWithStorage<AuthStorage>('auth', { token: null }, storage);

const baseAuthAtom = atomWithDefault(async (get) => {
  const state = await validateAuthState(get(authStorageAtom));
  tokenRef.current = state.token;
  return state;
});

export const authAtom = atom(
  (get) => get(baseAuthAtom),
  (get, set, update: AuthUpdate) => {
    switch (update.type) {
      case 'login':
        set(authStorageAtom, { token: update.token });
        set(baseAuthAtom, { status: AuthStatus.VALID, token: update.token });
        tokenRef.current = update.token;
        break;

      case 'logout':
        set(authStorageAtom, { token: null });
        set(baseAuthAtom, { status: AuthStatus.INVALID, token: null });
        tokenRef.current = null;
        queryClient.clear();
        break;
    }
  },
);

interface ValidateAuthStateParams {
  token: string | null;
}

async function validateAuthState({ token }: ValidateAuthStateParams): Promise<AuthState> {
  if (token == null) {
    return { status: AuthStatus.INVALID, token: null };
  }

  try {
    await client.get('api/v1/user/me', { headers: { authorization: getAuthorizationHeader(token) } });
    return { status: AuthStatus.VALID, token };
  } catch {
    return { status: AuthStatus.INVALID, token };
  }
}
