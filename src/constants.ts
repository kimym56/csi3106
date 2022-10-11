import { ParamListBase } from '@react-navigation/native';

export const enum ScreenName {
  로그인 = 'login',
  회원가입 = 'signup',
  메인 = 'main',
  홈 = 'home',
}

export type ParamList = ParamListBase & {};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}
