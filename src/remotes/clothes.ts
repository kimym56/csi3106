import { Style } from '../models/style';
import { client } from '../utils/network';

export async function getStyle(id: number) {
  return client.get(`api/v1/closet/styles/${id}`).json<Style>();
}
