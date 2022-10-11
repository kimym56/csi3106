import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { atom } from 'jotai';
import { atomWithDefault, atomWithStorage } from 'jotai/utils';
import { AuthState, AuthStatus, AuthStorage } from '../models/auth';
import { validateToken } from '../remotes/auth';
import { storage } from '../utils/storage';

type AuthUpdate =
  | { type: 'login'; token: string }
  | { type: 'revalidate'; status?: AuthStatus; netInfo?: NetInfoState };

const authStorageAtom = atomWithStorage<AuthStorage>('auth', { token: null }, storage);
const baseAuthAtom = atomWithDefault((get) => validateAuthState(get(authStorageAtom)));

export const authAtom = atom(
  (get) => get(baseAuthAtom),
  (get, set, update: AuthUpdate) => {
    const prevState = get(baseAuthAtom);

    switch (update.type) {
      case 'login':
        set(authStorageAtom, { token: update.token });
        set(baseAuthAtom, { status: AuthStatus.VALID, token: update.token });
        break;

      case 'revalidate':
        if (update.status == null || update.status === prevState.status) {
          validateAuthState({ token: prevState.token, netInfo: update.netInfo }).then((state) => {
            set(baseAuthAtom, state);
          });
        }
        break;
    }
  },
);

authAtom.onMount = (set) => {
  // 네트워크 상태가 변경되면 토큰의 유효성을 다시 검증
  const unsubscribe = NetInfo.addEventListener((netInfo) => {
    if (netInfo) {
      set({ type: 'revalidate', status: AuthStatus.UNKNOWN, netInfo });
    }
  });

  return () => {
    unsubscribe();
  };
};

interface ValidateAuthStateParams {
  token: string | null;
  netInfo?: NetInfoState;
}

async function validateAuthState({ token, netInfo }: ValidateAuthStateParams): Promise<AuthState> {
  // 빈 토큰은 무조건 올바르지 않은 인증 상태로 취급
  if (token == null) {
    return { status: AuthStatus.INVALID, token: null };
  }

  // 인터넷에 연결할 수 없는 경우 토큰의 유효성을 알 수 없음
  if (netInfo == null) {
    netInfo = await NetInfo.fetch();
  }

  if (!netInfo.isInternetReachable) {
    return { status: AuthStatus.UNKNOWN, token };
  }

  // 토큰 유효성 검사
  const isValid = await validateToken({ token });

  if (!isValid) {
    return { status: AuthStatus.INVALID, token };
  }

  return { status: AuthStatus.VALID, token };
}
