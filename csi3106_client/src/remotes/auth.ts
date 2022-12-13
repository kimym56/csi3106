import { client } from '../utils/network';

export interface ObtainTokenParams {
  email: string;
  password: string;
}

export interface ObtainTokenResult {
  token: string;
}

export async function obtainToken(params: ObtainTokenParams): Promise<ObtainTokenResult> {
  return await client.post('api/v1/auth/login', { json: params }).json();
}

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
  height: number;
  weight: number;
}

export interface CreateUserResult {
  id: number;
  token: string;
  email: string;
}

export async function createUser(params: CreateUserParams): Promise<CreateUserResult> {
  return await client.post('api/v1/auth/signup', { json: params }).json();
}
