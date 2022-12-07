import { Comment, Shop } from '../models/style';
import { client } from '../utils/network';

export async function getMyShopList(): Promise<Shop[]> {
  return client.get('api/v1/shop/my_market').json();
}

export interface GetRecommendedShopListParams {
  styleId: number;
}

export async function getRecommendedShopList({ styleId }: GetRecommendedShopListParams): Promise<Shop[]> {
  return client.post(`api/v1/style/${styleId}/recommend-clothes`).json();
}

export interface GetShopListParams {
  priceList?: number[];
  type?: string;
  color?: string;
}

export async function getShopList(params: GetShopListParams = {}): Promise<Shop[]> {
  const searchParams = new URLSearchParams();

  if (params.priceList != null && params.priceList.length > 0) {
    searchParams.set('priceList', params.priceList.join(','));
  }

  if (params.type != null) {
    searchParams.set('type', params.type);
  }

  if (params.color != null) {
    searchParams.set('color', params.color);
  }

  return client.get('api/v1/shop/all_market_filtered', { searchParams }).json();
}

export async function getShop(id: number): Promise<Shop> {
  return client.get(`api/v1/shop/${id}`).json<Shop>();
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

export async function getCommentList(id: number): Promise<Comment[]> {
  return client.get(`api/v1/shop/${id}/comment`).json();
}

export interface CreateCommentParams {
  id: number;
  content: string;
}

export function createComment(params: CreateCommentParams): Promise<Comment> {
  return client
    .post(`api/v1/shop/${params.id}/comment`, {
      json: {
        content: params.content,
      },
    })
    .json();
}
