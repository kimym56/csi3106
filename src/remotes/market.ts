import { Market } from '../models/market';
import { client } from '../utils/network';

export async function getMarketList() {
  return client.get('api/v1/styles/me').json();
}

export async function getMarket(id: number): Promise<Market> {
  const data = await client.get(`api/v1/styles/${id}`).json<Record<string, unknown>>();

  // TODO(@yuseong.chp):
  //  아직 서버에서 전달해주지 않는 데이터를 임시로 채웁니다.
  //  https://csi3106.slack.com/archives/C04381SPVUZ/p1668521091204869
  return {
    uploaderName: 'yuseong.cho',
    uploadedTime: '2022-11-15T23:09:16+09:00',
    ...data,
  } as Market;
}

export async function deleteMarket(id: number): Promise<void> {
  await client.delete(`api/v1/style/${id}`);
}

export interface GetRecommendedMarketListParams {
  styleId: number;
}

export async function getRecommendedMarketList({ styleId }: GetRecommendedMarketListParams) {
  return client.get(`api/v1/style/${styleId}/recommend-clothes`).json<Market[]>();
}
