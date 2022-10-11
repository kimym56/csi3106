export interface AuthState {
  isLoggedIn: boolean;
}

export function useAuth(): AuthState {
  // TODO(@yuseong.cho):
  //  실제 로그인 여부를 체크하는 로직을 여기에 추가할 예정
  return { isLoggedIn: false };
}
