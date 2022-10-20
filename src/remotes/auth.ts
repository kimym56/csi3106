import { client } from '../utils/network';

interface ObtainTokenParams {
  email: string;
  password: string;
}

interface ObtainTokenResult {
  token: string;
}

export async function obtainToken(params: ObtainTokenParams): Promise<ObtainTokenResult> {
  return await client.post('api/v1/auth/login', { json: params }).json();
}
