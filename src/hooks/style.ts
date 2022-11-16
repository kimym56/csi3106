import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteStyle, getMyStyleList, getStyle } from '../remotes/style';

export function useMyStyleListQuery() {
  return useQuery({
    queryKey: ['styles'],
    queryFn: () => getMyStyleList(),
  });
}

export function useStyleQuery(id: number) {
  return useQuery({
    queryKey: ['style', id],
    queryFn: () => getStyle(id),
  });
}

export function useStyleDelete({ onSuccess, ...options }: UseMutationOptions<void, unknown, number> = {}) {
  const client = useQueryClient();

  return useMutation(deleteStyle, {
    onSuccess(data, ...args) {
      client.removeQueries(['styles']);
      onSuccess?.(data, ...args);
    },
    ...options,
  });
}
