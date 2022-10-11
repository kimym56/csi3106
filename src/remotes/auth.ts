interface ValidateTokenParams {
  token: string;
}

export async function validateToken(params: ValidateTokenParams): Promise<boolean> {
  console.debug('validateToken(', params, ')');
  return false;
}

interface ObtainTokenParams {
  email: string;
  password: string;
}

interface ObtainTokenResult {
  token: string;
}

export async function obtainToken(params: ObtainTokenParams): Promise<ObtainTokenResult> {
  console.debug('obtainToken(', params, ')');
  throw new Error('not implemented');
}
