import { atom } from 'jotai';
import { atomWithDefault, atomWithStorage } from 'jotai/utils';
import { AuthState, AuthStatus, AuthStorage } from '../models/auth';
import { validateToken } from '../remotes/auth';
import { tokenRef } from '../utils/network';
import { storage } from '../utils/storage';

type AuthUpdate = { type: 'login'; token: string };

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
    }
  },
);

interface ValidateAuthStateParams {
  token: string | null;
}

async function validateAuthState({ token }: ValidateAuthStateParams): Promise<AuthState> {
  const isValid = token != null && (await validateToken({ token }));

  return {
    status: isValid ? AuthStatus.VALID : AuthStatus.INVALID,
    token,
  };
}
