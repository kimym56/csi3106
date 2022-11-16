import { ParamListBase } from '@react-navigation/native';

export const enum ScreenName {
  로그인 = 'login',
  회원가입 = 'signup',
  회원가입2 = 'signup2',
  메인 = 'main',
  홈 = 'home',
  스타일_목록 = 'style-list',
  스타일_상세 = 'style-detail',
  스타일_업로드 = 'style-upload',
  상점_목록 = 'shop-list',
  상점_상세 = 'shop-detail',
  상점_업로드 = 'shop-upload',
  마이페이지 = 'mypage',
}

export type ParamList = ParamListBase & {
  [ScreenName.스타일_상세]: {
    styleId: number;
  };
  [ScreenName.상점_상세]: {
    clothesId: number;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}

export const IMAGE_URL_PREFIX = 'https://pub-5060761a398f439d8ef34d5acfc6bc3a.r2.dev/';

export const Colors = {
  ACCENT: '#6600FF',
  SECONDARY: 'rgba(0, 0, 0, 0.4)',
  WHITE: '#FFFFFF',
} as const;
