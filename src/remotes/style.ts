import ky from 'ky';
import { Shop, Style } from '../models/style';
import { client } from '../utils/network';

export async function getMyStyleList() {
  return client.get('api/v1/style/me').json();
}

export async function getStyle(id: number): Promise<Style> {
  const data = await client.get(`api/v1/style/${id}`).json<Record<string, unknown>>();

  // TODO(@yuseong.chp):
  //  아직 서버에서 전달해주지 않는 데이터를 임시로 채웁니다.
  //  https://csi3106.slack.com/archives/C04381SPVUZ/p1668521091204869
  return {
    uploaderName: 'yuseong.cho',
    uploadedTime: '2022-11-15T23:09:16+09:00',
    ...data,
  } as Style;
}

export interface CreateStyleParams {
  imagePath: string;
  type: string;
  size: string;
}

export function createStyle(params: CreateStyleParams): Promise<Style> {
  return client.post('api/v1/style/add', { json: params }).json();
}

export async function deleteStyle(id: number): Promise<void> {
  await client.delete(`api/v1/style/${id}`);
}

export interface UploadStyleImageParams {
  uri: string;
  fileName: string;
  contentType: string;
  contentLength: number;
}

export interface UploadStyleImageResult {
  imagePath: string;
  imageUploadUrl: string;
}

export async function uploadStyleImage({ uri, fileName, contentType, contentLength }: UploadStyleImageParams) {
  //console.log(fileName, contentType, contentLength);
  const data = await client
    .post('api/v1/image/upload-url', {
      json: { fileName, contentType, contentLength },
    })
    .json<UploadStyleImageResult>();

  await ky.put(data.imageUploadUrl, {
    headers: { 'content-type': contentType },
    body: { uri },
  });

  return data;
}

export interface GetRecommendedTagsParams {
  imagePath: string;
}

export interface GetRecommendedTagsResult {
  imagePath: string;
  recommendedTags: string[];
}

export function getRecommendedTags(params: GetRecommendedTagsParams): Promise<GetRecommendedTagsResult> {
  return client.post('api/v1/image/recommend-tags', { json: params }).json();
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
