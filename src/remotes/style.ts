import { Style } from '../models/style';
import { client } from '../utils/network';

export async function getMyStyleList() {
  return client.get('api/v1/styles/me').json();
}

export async function getStyle(id: number): Promise<Style> {
  const data = await client.get(`api/v1/styles/${id}`).json<Record<string, unknown>>();

  // TODO(@yuseong.chp):
  //  아직 서버에서 전달해주지 않는 데이터를 임시로 채웁니다.
  //  https://csi3106.slack.com/archives/C04381SPVUZ/p1668521091204869
  return {
    uploaderName: 'yuseong.cho',
    uploadedTime: '2022-11-15T23:09:16+09:00',
    ...data,
  } as Style;
}

export async function deleteStyle(id: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 3000));
  throw new Error(`not implemented: deleteStyle(${id})`);
}
