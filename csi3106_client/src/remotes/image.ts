import ky from 'ky';
import { client } from '../utils/network';

export interface UploadImageParams {
  uri: string;
  fileName: string;
  contentType: string;
  contentLength: number;
}

export interface UploadImageResult {
  imagePath: string;
  imageUploadUrl: string;
}

export async function uploadImage({ uri, fileName, contentType, contentLength }: UploadImageParams) {
  const data = await client
    .post('api/v1/image/upload-url', {
      json: { fileName, contentType, contentLength },
    })
    .json<UploadImageResult>();

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
