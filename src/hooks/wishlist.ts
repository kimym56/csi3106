import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteWishlist, getWishlist, putWishlist } from '../remotes/wishlist';

export function useWishlistQuery() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
  });
}

export function useWishlistPut(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();
  return useMutation(putWishlist, {
    ...options,
    onSuccess(data, ...args) {
      client.invalidateQueries(['wishlist']);
      options?.onSuccess?.(data, ...args);
    },
  });
}
export function useWishlistDelete(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();
  return useMutation(deleteWishlist, {
    ...options,
    onSuccess(data, ...args) {
      client.invalidateQueries(['wishlist']);
      options?.onSuccess?.(data, ...args);
    },
  });
}
