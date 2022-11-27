import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { Shop } from '../models/style';
import { createShop, CreateShopParams } from '../remotes/shop';
import { getMyShopList, getShop } from '../remotes/shop';

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

export function useMyShopListQuery() {
  return useQuery({
    queryKey: ['shops'],
    queryFn: () => getMyShopList(),
  });
}

export function useShopQuery(id: number) {
  return useQuery({
    queryKey: ['shop', id],
    queryFn: () => getShop(id),
  });
}
