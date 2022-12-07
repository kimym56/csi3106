import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteShop,
  getRecommendedShopList,
  GetRecommendedShopListParams,
  getShopList,
  GetShopListParams,
} from '../remotes/shop';

export function useMarketListQuery(params: GetShopListParams) {
  return useQuery({
    queryKey: ['markets'],
    queryFn: () => getShopList(params),
  });
}

export function useRecommendedMarketListQuery(params: GetRecommendedShopListParams) {
  return useQuery({
    queryKey: ['recommended-market-list', params],
    queryFn: () => getRecommendedShopList(params),
  });
}

export function useMarketDelete(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();

  return useMutation(deleteShop, {
    ...options,
    onSuccess(data, ...args) {
      client.invalidateQueries(['markets']);
      options?.onSuccess?.(data, ...args);
    },
  });
}
