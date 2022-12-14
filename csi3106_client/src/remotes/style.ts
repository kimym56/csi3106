import { Style } from '../models/style';
import { client } from '../utils/network';

export async function getMyStyleList() {
  return client.get('api/v1/style/me').json();
}

export async function getOtherStyleList(id: number) {
  return client.get(`api/v1/style/others/${id}`).json();
}

export async function getStyle(id: number): Promise<Style> {
  return client.get(`api/v1/style/${id}`).json();
}

export interface CreateStyleParams {
  imagePath: string;
  type: string;
  size: string;
}

export async function createStyle(params: CreateStyleParams): Promise<Style> {
  return client.post('api/v1/style/add', { json: params }).json();
}

export async function deleteStyle(id: number): Promise<void> {
  await client.delete(`api/v1/style/${id}`);
}
