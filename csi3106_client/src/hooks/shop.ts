import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { Comment, Shop } from '../models/style';
import {
  createComment,
  CreateCommentParams,
  createShop,
  CreateShopParams,
  getCommentList,
  getOtherShopList,
} from '../remotes/shop';
import { getMyShopList, getShop } from '../remotes/shop';

export function useMyShopListQuery() {
  return useQuery({
    queryKey: ['shops'],
    queryFn: () => getMyShopList(),
  });
}

export function useOtherShopListQuery(id: number) {
  return useQuery({
    queryKey: ['other-shops', id],
    queryFn: () => getOtherShopList(id),
  });
}

export function useShopQuery(id: number) {
  return useQuery({
    queryKey: ['shop', id],
    queryFn: () => getShop(id),
  });
}

export function useShopCreate(options?: UseMutationOptions<Shop, unknown, CreateShopParams>) {
  const client = useQueryClient();

  return useMutation(createShop, {
    ...options,
    onSuccess(...args) {
      client.invalidateQueries(['shops']);
      options?.onSuccess?.(...args);
    },
  });
}

export function useShopCommentQuery(id: number) {
  return useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentList(id),
  });
}

export function useShopCommentCreate(options?: UseMutationOptions<Comment, unknown, CreateCommentParams>) {
  const client = useQueryClient();

  return useMutation(createComment, {
    ...options,
    onSuccess(...args) {
      client.invalidateQueries(['comments']);
      options?.onSuccess?.(...args);
    },
  });
}
