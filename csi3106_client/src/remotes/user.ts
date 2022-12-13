import { User, UserFollow } from '../models/user';
import { client } from '../utils/network';

export async function getCurrentUser() {
  return client.get('api/v1/user/me').json<User>();
}

export async function getCurrentUserFollow() {
  return client.get('api/v1/user/follow-info').json<UserFollow>();
}

export async function getOtherUser(id: number) {
  return client.get(`api/v1/user/${id}`).json<User>();
}

export async function getOtherUserFollow(id: number) {
  return client.get(`api/v1/user/${id}/follow-info`).json<UserFollow>();
}

export async function getIsFollow(id: number): Promise<boolean> {
  return client.get(`api/v1/user/${id}/follow`).json();
}

export async function createFollow(id: number) {
  await client.post(`api/v1/user/${id}/follow`);
}

export async function deleteFollow(id: number) {
  await client.delete(`api/v1/user/${id}/follow`);
}
