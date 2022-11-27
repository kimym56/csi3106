import { Shop } from '../models/style';
import { client } from '../utils/network';

export async function getMyShopList() {
  return client.get('api/v1/shop/my_market').json();
}

export async function getShop(id: number): Promise<Shop> {
  const data = await client.get(`api/v1/shop/${id}`).json<Record<string, unknown>>();

  // TODO(@yuseong.chp):
  //  아직 서버에서 전달해주지 않는 데이터를 임시로 채웁니다.
  //  https://csi3106.slack.com/archives/C04381SPVUZ/p1668521091204869
  return {
    ...data,
  } as unknown as Shop;
}

export interface CreateShopParams {
  title: string;
  price: number;
  detail: string;
  frontImagePath: string;
  backImagePath: string;
  detailImagePath: string;
  type: string;
  color: string;
}

export function createShop(params: CreateShopParams): Promise<Shop> {
  return client.post('api/v1/shop/add', { json: params }).json();
}

export async function deleteShop(id: number): Promise<void> {
  await client.delete(`api/v1/shop/${id}`);
}
