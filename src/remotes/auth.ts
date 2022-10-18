import { client, getAuthorizationHeader } from '../utils/network';

interface ValidateTokenParams {
  token: string;
}

export async function validateToken({ token }: ValidateTokenParams): Promise<boolean> {
  try {
    await client.get('api/v1/user/me', {
      headers: {
        authorization: getAuthorizationHeader(token),
      },
    });
    return true;
  } catch {
    return false;
  }
}

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
