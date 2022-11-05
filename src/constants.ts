import { ParamListBase } from '@react-navigation/native';

export const enum ScreenName {
  로그인 = 'login',
  회원가입 = 'signup',
  회원가입2 = 'signup2',
  메인 = 'main',
  홈 = 'home',
  스타일_목록 = 'style-list',
  스타일_상세 = 'style-detail',
  상점_목록 = 'shop-list',
  마이페이지 = 'mypage',
}

export type ParamList = ParamListBase & {
  [ScreenName.스타일_상세]: {
    clothesId: number;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}

export const IMAGE_URL_PREFIX = 'https://pub-5060761a398f439d8ef34d5acfc6bc3a.r2.dev/';
