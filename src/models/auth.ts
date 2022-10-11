export interface AuthState {
  status: AuthStatus;
  token: string | null;
}

export const enum AuthStatus {
  VALID = 'valid',
  INVALID = 'invalid',
  UNKNOWN = 'unknown',
}

export interface AuthStorage {
  token: string | null;
}
