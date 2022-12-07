import { client } from '../utils/network';
import { Shop } from './../models/style';

export async function getWishlist() {
  return client.get('api/v1/wishlist').json<Array<Shop>>();
}
export async function putWishlist(id: number): Promise<void> {
  await client.put(`api/v1/wishlist/${id}`);
}
export async function deleteWishlist(id: number): Promise<void> {
  await client.delete(`api/v1/wishlist/${id}`);
}
