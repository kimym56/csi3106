export interface User {
  id: number;
  email: string;
  height: number;
  name: string;
  weight: number;
}

export interface UserFollow {
  id: number;
  followingNum: number;
  followerNum: number;
}
