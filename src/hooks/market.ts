import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteMarket,
  getMarket,
  getMarketList,
  getRecommendedMarketList,
  GetRecommendedMarketListParams,
} from '../remotes/market';

export function useMarketListQuery() {
  return useQuery({
    queryKey: ['markets'],
    queryFn: () => getMarketList(),
  });
}

export function useRecommendedMarketListQuery(params: GetRecommendedMarketListParams) {
  return useQuery({
    queryKey: ['recommended-market-list', params],
    queryFn: () => getRecommendedMarketList(params),
  });
}

export function useMarketQuery(id: number) {
  return useQuery({
    queryKey: ['markets', id],
    queryFn: () => getMarket(id),
  });
}

export function useMarketDelete(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();

  return useMutation(deleteMarket, {
    ...options,
    onSuccess(data, ...args) {
      client.invalidateQueries(['markets']);
      options?.onSuccess?.(data, ...args);
    },
  });
}
