export interface AuthState {
  status: AuthStatus;
  token: string | null;
}

export const enum AuthStatus {
  VALID = 'valid',
  INVALID = 'invalid',
}

export interface AuthStorage {
  token: string | null;
}
