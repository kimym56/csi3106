import { ParamListBase } from '@react-navigation/native';

export const enum ScreenName {
  로그인 = 'login',
  회원가입 = 'signup',
  회원가입2 = 'signup2',
  메인 = 'main',
  홈 = '홈',
  스타일_목록 = 'style-list',
  스타일_상세 = 'style-detail',
  스타일_업로드 = 'style-upload',
  상점_목록 = 'shop-list',
  상점_상세 = 'shop-detail',
  상점_업로드 = 'shop-upload',
  마이페이지 = 'mypage',
  마켓 = 'market',
  다른사람 = 'other-user',
}

export type ParamList = ParamListBase & {
  [ScreenName.스타일_상세]: {
    styleId: number;
  };
  [ScreenName.상점_상세]: {
    clothesId: number;
  };
  [ScreenName.다른사람]: {
    id: number;
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
  LIGHTGRAY: '#D0D0D0',
} as const;

export const TagName = {
  'a shortsleeve': {
    kor: '반팔티',
  },
  'a onepiece': {
    kor: '원피스',
  },
  'a skirt': {
    kor: '스커트',
  },
  'a shirts': {
    kor: '셔츠',
  },
  'a padding': {
    kor: '패딩',
  },
  'a coat': {
    kor: '코트',
  },
  'a jacket': {
    kor: '자켓',
  },
  'a accessorie': {
    kor: '악세사리',
  },
  'a bag': {
    kor: '가방',
  },
  'a longsleeve': {
    kor: '긴팔티',
  },
  'a long pants': {
    kor: '긴바지',
  },
  'a short pants': {
    kor: '반바지',
  },
  'a sleeveless': {
    kor: '민소매',
  },
};
