import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { Shop } from '../models/style';
import { createShop, CreateShopParams } from '../remotes/style';

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
