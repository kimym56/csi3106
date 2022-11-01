import { User } from '../models/user';
import { client } from '../utils/network';

export async function getCurrentUser() {
  return client.get('api/v1/user/me').json<User>();
}
